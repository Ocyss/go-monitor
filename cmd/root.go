package cmd

import (
	"fmt"
	"github.com/Ocyss/go-monitor/cmd/flags"
	"github.com/Ocyss/go-monitor/internal/bootstrap"
	"github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"os"
	"path/filepath"
)

var rootCmd = &cobra.Command{
	Use:   "go-monitor",
	Short: "go-monitor is a highly extensible web visualization panel",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(`go-monitor v1.1
- start 
- stop`)
	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func init() {
	var baseDir, dataDir string
	var err error
	// first configure the log format to meet ocd needs
	formatter := logrus.TextFormatter{
		ForceColors:               true,
		EnvironmentOverrideColors: true,
		TimestampFormat:           "2006-01-02 15:04:05",
		FullTimestamp:             true,
		DisableQuote:              true,
	}
	logrus.SetFormatter(&formatter)
	cobra.OnInitialize(bootstrap.InitConf)
	cobra.OnInitialize(bootstrap.InitLog)
	cobra.OnInitialize(bootstrap.InitDb)

	rootCmd.PersistentFlags().StringVar(&dataDir, "data", "data", "config file")
	rootCmd.PersistentFlags().BoolVar(&flags.Debug, "debug", false, "start with debug mode")
	rootCmd.PersistentFlags().BoolVar(&flags.Dev, "dev", false, "start with dev mode")
	rootCmd.PersistentFlags().BoolVar(&flags.LogStd, "log-std", false, "Force to log to std")
	rootCmd.PersistentFlags().BoolVar(&flags.Memory, "memory", false, "using temporary database")
	flags.Pro = !flags.Dev
	if baseDir, err = os.Executable(); err != nil {
		logrus.Fatal(err)
	}
	flags.ExPath = filepath.Dir(baseDir)
	flags.DataDir = filepath.Join(flags.ExPath, dataDir)
}
