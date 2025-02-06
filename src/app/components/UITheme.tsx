'use client'

import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00A76F',
        },
        // 使用 `getContrastText()` 来最大化
        // 背景和文本的对比度
        contrastThreshold: 3,
        // 使用下面的函数用于将颜色的亮度在其调色板中
        // 移动大约两个指数。
        // 例如，从红色 500（Red 500）切换到 红色 300（Red 300）或 红色 700（Red 700）。
        tonalOffset: 0.2,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'inherit'
                }
            }
        }
    }
});

export default function UITheme({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}