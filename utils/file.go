package utils

import "os"

// Exists determine whether the specified file exists
func Exists(name string) bool {
	stat, err := os.Stat(name)
	if err != nil {
		if os.IsNotExist(err) {
			return false
		}
	}
	return !stat.IsDir()
}

// ExistsDir determine whether the specified dir exists
func ExistsDir(name string) bool {
	stat, err := os.Stat(name)
	if err != nil {
		if os.IsNotExist(err) {
			return false
		}
	}
	return stat.IsDir()
}
