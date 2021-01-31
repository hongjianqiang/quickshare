import os from 'os'
import process from 'process'

function getLocalhosts () {
  const ipReg = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  const networkInterfaces = os.networkInterfaces();
  const interfaces = Object.values(networkInterfaces);
  const localhosts = [];

  for (const i of interfaces) {
      const addrs = i.map(item => item.address).filter(item => ipReg.test(item));
      localhosts.push(...addrs);
  }

  return localhosts;
}

function getParamValue (params = [], defaultValue) {
  const argv = process.argv;

  for (const param of params) {
      const index = argv.indexOf(param);

      if (index >= 0) {
          return argv[index + 1];
      }
  }

  return defaultValue;
}

// 本地所有网卡的IP地址
export const LOCALHOSTS = getLocalhosts()

// 自定义主机
export const HOST = getParamValue(['-h', '--host'], '0.0.0.0')

// 自定义端口
export const PORT = getParamValue(['-p', '--port'], 2020)

// 自定义字符集
export const CHARSET = getParamValue(['-c', '--charset'], 'UTF-8')

// 自定义根目录
export const BASE_DIR = getParamValue(['-d', '--dir'], process.cwd())

export default {
  HOST,
  PORT,
  CHARSET,
  BASE_DIR,
  LOCALHOSTS
}
