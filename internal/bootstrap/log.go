package bootstrap

import (
	"fmt"
	"github.com/Ocyss/go-monitor/cmd/flags"
	"github.com/Ocyss/go-monitor/internal/conf"
	"github.com/natefinch/lumberjack"
	log "github.com/sirupsen/logrus"
	"io"
	"os"
)

func InitLog() {
	logConf := conf.Conf.Log
	if flags.Dev || flags.Debug {
		log.SetLevel(log.DebugLevel)
		log.SetReportCaller(flags.Debug)
	} else {
		level, err := log.ParseLevel(logConf.Level)
		if err != nil {
			panic(fmt.Sprintf("Incorrect log level, available: [panic,fatal,error,warn,info,debug,trace],%v", err))
		}
		log.SetLevel(level)
	}
	if logConf.Enable {
		var w io.Writer = &lumberjack.Logger{
			Filename:   logConf.Name,
			MaxSize:    logConf.MaxSize,
			MaxBackups: logConf.MaxBackups,
			MaxAge:     logConf.MaxAge,
			Compress:   logConf.Compress,
		}
		if flags.Dev || flags.Debug || flags.LogStd {
			w = io.MultiWriter(os.Stdout, w)
		}
		log.SetOutput(w)
	}
	log.Info("init logrus success!")
}
