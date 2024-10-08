
# Documentación para iniciar el frontend

## Requisitos Previos

Asegúrate de tener instalado `nvm-windows` (Node Version Manager para Windows) en tu sistema. Si no lo tienes instalado, sigue las instrucciones de instalación en [el repositorio oficial de nvm-windows](https://github.com/coreybutler/nvm-windows).

## Pasos de Instalación

### 1. Instalar Node.js 16 usando `nvm-windows`

1. **Instalar `nvm-windows` (si no lo tienes instalado):**

   Descarga el instalador desde [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases) y ejecuta el instalador.

2. **Instalar Node.js 16:**

   Abre una ventana de comandos (CMD) o PowerShell y ejecuta:

   ```bash
   nvm install 16
   ```

3. **Usar Node.js 16:**

   ```bash
   nvm use 16
   ```

   **Nota:** Si ves un mensaje que dice que "nvm is not recognized as an internal or external command," asegúrate de que `nvm` está en tu PATH. Reinicia tu terminal si es necesario.


Asegúrate de tener `yarn` instalado. Si no lo tienes, puedes instalarlo con:

```bash
npm install --global yarn
```

Luego, instala las dependencias del proyecto:

```bash
yarn install
```

### 4. Iniciar el Proyecto

Para iniciar la DApp, ejecuta el siguiente comando:

```bash
yarn start
```

Este comando iniciará el servidor de desarrollo y podrás acceder  a la dapp en tu navegador web, generalmente en `http://localhost:3000`.
#   D I V I S W A P M 
 
 