package server

import (
	"github.com/Ocyss/go-monitor/server/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func Init(r *gin.Engine) {
	r.MaxMultipartMemory = 8 << 20
	r.Use(gin.LoggerWithWriter(log.StandardLogger().Out), gin.RecoveryWithWriter(log.StandardLogger().Out))
	r.Use(gin.Recovery())
	r.Use(cors.Default())
	r.Any("ping", func(c *gin.Context) {
		c.String(200, "pong")
	})
	router := r.Group("api")
	router.POST("view/add", handlers.ViewAdd)
	router.GET("view/gets", handlers.ViewGets)
	router.GET("view/get", handlers.ViewGet)
	router.GET("view/check", handlers.ViewCheck)
	router.POST("card/add", handlers.CardAdd)
}
