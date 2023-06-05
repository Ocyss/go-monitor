package cmd

import (
	"github.com/Ocyss/go-monitor/cmd/flags"
	"github.com/Ocyss/go-monitor/utils"
	log "github.com/sirupsen/logrus"
	"os"
	"path/filepath"
	"strconv"
)

var pid = -1
var pidFile string

// initDaemon author:Noah Hsu <i@nn.ci>
func initDaemon() {
	pidFile = filepath.Join(flags.DataDir, "pid")
	if utils.Exists(pidFile) {
		bytes, err := os.ReadFile(pidFile)
		if err != nil {
			log.Fatal("failed to read pid file", err)
		}
		id, err := strconv.Atoi(string(bytes))
		if err != nil {
			log.Fatal("failed to parse pid data", err)
		}
		pid = id
	}
}
