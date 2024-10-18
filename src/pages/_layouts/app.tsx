import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '../../components/header'
import { api } from '@/lib/axios'
import { useEffect } from 'react'
import { isAxiosError } from 'axios'

export function AppLayout(){
    const navigate = useNavigate()

    // interceptar todas as respostas das requisições HTTP feitas pela api
    // evita que o usuário navegue no dashboard sem estar autenticado, redirecionando ele até a página de autentificação
    useEffect(() => {
        const interceptorId = api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isAxiosError(error)) {
            const status = error.response?.status
            const code = error.response?.data.code

            if (status === 401 && code === 'Unauthorized') {
                navigate('/sign-in', { replace: true })
                // replace true faz com que o usuario não consiga voltar usando o back-link do navegador
            } else {
                throw error
            }
            }
        },
        )

        return () => {
        api.interceptors.response.eject(interceptorId)
        }
    }, [navigate])


    return (
        <div className="flex min-h-screen flex-col antialiased">
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
                <Outlet />
            </div>
        </div>
    )
}