import React, { useState, useContext, useEffect } from 'react'
import { AutenticadoContexto } from '../Contexts/authContexts'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiLocal from '../Api/apiLocal'
import './estilo.cadastroPedidos.scss'

export default function Carrinho() {

    const { verificarToken, token } = useContext(AutenticadoContexto)
    verificarToken()

    useEffect(() => {
        try {
            async function buscarPedidosCliente() {
                const resposta = await apiLocal.get('/ConsultarPedidos', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setDados(resposta.data)
            }
            buscarPedidosCliente()
        } catch (err) {
            toast.error(err.response.data)
        }
        // eslint-disable-next-line
    }, [token])

    const [dados, setDados] = useState([''])

    return (
        <div className='conteinerGeralCarrinho'>
            <h1>Carrinho</h1>
            <table className='tabelaClasse'>
                <thead>
                    <tr>
                        <th>Número Pedido</th>
                        <th>Status Pedido</th>
                        <th>Visualizar - Apagar</th>
                    </tr>
                </thead>
                {dados.map((item) => {
                    return (
                        <>
                            <tbody>
                                <tr>
                                    <td>{item.n_pedido}</td>
                                    <td>{item.status}</td>
                                    <td>Visualizar - Apagar</td>
                                </tr>
                            </tbody>
                        </>
                    )
                })}
            </table>
        </div>
    )
}