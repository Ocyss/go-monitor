package handlers

import (
	"errors"
	"fmt"
	"github.com/Ocyss/go-monitor/internal/db"
	"github.com/Ocyss/go-monitor/internal/model"
	"github.com/Ocyss/go-monitor/server/common"
	"github.com/gin-gonic/gin"
)

func CardAdd(c *gin.Context) {
	var data model.Card
	if err := c.ShouldBindJSON(&data); err != nil {
		common.ErrParam(c, err)
		return
	}
	if data.Data == nil && data.LinkID == nil {
		common.Err(c, "Creating Card must provide Data or Link")
		return
	}
	if err := db.CardAdd(&data); err != nil {
		fmt.Println(err)
		if errors.Is(err, &model.ErrEmptyLink{}) {
			common.Err(c, err.Error(), err)
		} else {
			common.Err(c, "Card Add failed.", err)
		}
	} else {
		common.OKData(c, data.ID)
	}
}
