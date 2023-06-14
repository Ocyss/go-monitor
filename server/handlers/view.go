package handlers

import (
	"errors"
	"fmt"
	"github.com/Ocyss/go-monitor/internal/db"
	"github.com/Ocyss/go-monitor/internal/model"
	"github.com/Ocyss/go-monitor/server/common"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"strconv"
)

func ViewAdd(c *gin.Context) {
	var data model.View
	if err := c.ShouldBindJSON(&data); err != nil {
		common.ErrParam(c, err)
		return
	}
	if err := db.ViewAdd(&data); err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			common.Err(c, "Path repeated, this is a fatal error.", err)
		} else {
			common.Err(c, "View Add failed.", err)
		}
	} else {
		common.OKData(c, data.ID)
	}
}
func ViewGets(c *gin.Context) {
	data, err := db.ViewGets()
	if err != nil {
		common.Err(c, "View Gets failed.", err)
	} else {
		common.OKData(c, data)
	}
}

func ViewGet(c *gin.Context) {
	qid := c.Query("id")
	id, err := strconv.Atoi(qid)
	if err != nil {
		common.ErrParam(c, err)
		return
	}
	data, err := db.ViewGet(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			common.Err(c, fmt.Sprintf("ID:%d that does not exist", id), err)
		} else {
			common.Err(c, "View Get failed.", err)
		}
	} else {

		if len(data.Cards) == 0 {
			NullCard := "this view does not have any cards"

			data.Cards = []model.Card{{Name: &NullCard}}
		}
		common.OKData(c, data)
	}
}
