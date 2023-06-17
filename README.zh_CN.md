## 安装node.js环境

### 推荐使用[nvm](https://github.com/nvm-sh/nvm)(一款node.js包管理工具)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

OR

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

安装成功后，可以尝试`node -v`查看版本，如果控制台没有正确输出版本信息，手动把下列脚本放到`~/.bash_profile`, `~/.zshrc`, `~/.profile`, `~/.bashrc`配置文件中（取决于使用的shell）

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

## 安装pnpm

```bash
npm i -g pnpm
```

## 选择正确的node版本

```bash
nvm use
```

## 安装项目依赖

```bash
pnpm i
```

## 本地启动项目

```bash
pnpm start
```

## 本地调试

安装[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)