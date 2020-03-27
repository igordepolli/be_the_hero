import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [casos, setCasos] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setCasos(response.data);
        })
    }, [ongId]);

    async function handleDeleteCaso(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setCasos(casos.filter(casos => casos.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongNome}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(casos => (
                    <li key={casos.id}>
                        <strong>CASO:</strong>
                        <p>{casos.titulo}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{casos.descricao}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(casos.valor)}</p>

                        <button onClick={() => handleDeleteCaso(casos.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}