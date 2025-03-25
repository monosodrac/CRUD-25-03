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
            // console.log(err.response)
        } catch (err) {
            toast.error(err.response.data)
        }
        // eslint-disable-next-line
    }, [token])

    const [dados, setDados] = useState([''])

    return (
        <div className='conteinerGeralCarrinho'>
            <h1>Carrinho</h1>
            {dados.map((item) => {
                return (
                    <>
                        <table className='tabelaClasse'>
                            <thead>
                                <tr>
                                    <td>{item.n_pedido}</td>
                                    <td>{item.status}</td>
                                    <td>Visualizar - Apagar</td>
                                </tr>
                            </thead>
                        </table>
                    </>
                )
            })}
        </div>
    )
}