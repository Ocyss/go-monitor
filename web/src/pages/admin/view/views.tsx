import api from "@/api";
import { View } from "@/types";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@suid/material";
import { createMemo, createSignal, mapArray, onMount } from "solid-js";
import style from "./view.module.scss";
import ConstructionIcon from "@suid/icons-material/Construction";
import { useNavigate } from "@solidjs/router";
const [rows, setRows] = createSignal<Array<View>>([]);

interface HeadCell {
  key: keyof View;
  label: string;
}
const headCells: Array<HeadCell> = [
  {
    label: "ID",
    key: "id",
  },
  {
    label: "Updated",
    key: "updated_at",
  },
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Path",
    key: "path",
  },
  {
    label: "Sort",
    key: "sort",
  },
];

type Order = "asc" | "desc";

function descendingComparator(a: View, b: View, orderBy: keyof View) {
  let aa = a[orderBy];
  let bb = b[orderBy];
  if (aa != undefined && bb != undefined) {
    if (bb < aa) {
      return -1;
    }
    if (bb > aa) {
      return 1;
    }
  }
  return 0;
}

function getComparato(
  order: Order,
  orderBy: keyof View
): (a: View, b: View) => number {
  return (a, b) =>
    order === "desc"
      ? descendingComparator(a, b, orderBy)
      : descendingComparator(b, a, orderBy);
}

function stableSort(
  array: readonly View[],
  comparator: (a: View, b: View) => number
) {
  const stabilizedThis = array.map(
    (el, index) => [el, index] as [View, number]
  );
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: any, property: keyof View) => void;
  order: Order;
  orderBy: keyof View;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof View) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            class={style.tableHead}
            align="center"
            padding="normal"
            sortDirection={order}
            // active={orderBy === headCell.key}
            // direction={orderBy === headCell.key ? order : "asc"}
          >
            <span class={style.title} onClick={createSortHandler(headCell.key)}>
              {headCell.label}
            </span>

            {orderBy === headCell.label ? (
              <Box component="span">
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableCell>
        ))}
        <TableCell align="center" padding="normal"></TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function Views() {
  const [order, setOrder] = createSignal<Order>("asc");
  const [orderBy, setOrderBy] = createSignal<keyof View>("sort");
  const navigate = useNavigate();
  let selected: readonly string[] = $signal([]);
  let page = $signal(0);
  let dense = $signal(false);
  let rowsPerPage = $signal(5);

  const handleRequestSort = (event: any, property: keyof View) => {
    const isAsc = orderBy() === property && order() === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    page = newPage;
  };

  const handleChangeRowsPerPage = (event: any) => {
    rowsPerPage = parseInt(event.target.value, 10);
    page = 0;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows().length) : 0;

  const visibleRows = createMemo<Array<View>>(() =>
    stableSort(rows(), getComparato(order(), orderBy())).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )
  );
  onMount(() => {
    api.view.gets().then((res) => {
      if (res.data) {
        setRows(
          res.data.map((item) => {
            if (item.updated_at === undefined) {
              item.updated_at = item.created_at;
            }
            return item;
          })
        );
      }
    });
  });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <EnhancedTableHead
          numSelected={selected.length}
          order={order()}
          orderBy={orderBy()}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <TableBody>
          {mapArray(
            () => visibleRows(),
            (row) => (
              <TableRow hover>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.updated_at}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.path}</TableCell>
                <TableCell align="center">{row.sort}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component="span"
                    onClick={() => navigate(`/admin/view?id=${row.id}`, {})}
                  >
                    <ConstructionIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
