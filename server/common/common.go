package common

import (
	"github.com/Ocyss/go-monitor/cmd/flags"
	"github.com/gin-gonic/gin"
	"net/http"
)

func OK(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"code": http.StatusOK,
		"msg":  "Success",
	})
}
func OKData(c *gin.Context, data any) {
	c.JSON(http.StatusOK, gin.H{
		"code": http.StatusOK,
		"msg":  "Success",
		"data": data,
	})
}
func ErrCode(c *gin.Context, code int, msg string, err ...error) {
	res := gin.H{
		"code": code,
		"msg":  msg,
	}
	// Determine whether the debug mode is correct, and if so, return an error message.
	if (flags.Dev || flags.Debug) && len(err) > 0 {
		errs := make([]string, len(err))
		for i, e := range err {
			errs[i] = e.Error()
		}
		res["errmsg"] = errs
	}
	c.AbortWithStatusJSON(http.StatusTooManyRequests, res)
}
func Err(c *gin.Context, msg string, err ...error) {
	ErrCode(c, 400, msg, err...)
}
func ErrParam(c *gin.Context, err ...error) {
	ErrCode(c, 400, "Incorrect parameters", err...)
}
