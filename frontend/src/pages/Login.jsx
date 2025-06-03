import React, { useState } from 'react'
import InputCampo from '../components/InputCampo'
import Navbar from '../components/Navbar'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return (
        <div>
            <Navbar/>
            <div className='flex flex-col items-center justify-center py-12 pt-[80px]'>
                <h2 className='text-3xl font-bold mb-6'>Login</h2>
                <div className='w-full max-w-md bg-[#1f1f1f] p-8 rounded-xl shadow-md text-white'>
                    <form>
                        <div className='mb-4'>
                            <InputCampo
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder={"Digite seu Email"}
                            />
                        </div>
                        <div className='mb-4'>
                            <InputCampo
                                type="password"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                placeholder={"Digite seu Senha"}
                            />
                        </div>
                        <div className="flex flex-col space-y-3 mt-6 p-4 rounded-lg">
                            <button type="submit" className='bg-white text-black font-semibold py-2 rounded hover:bg-red-100 hover:cursor-pointer'>Entrar</button>
                            <p>Não tem conta? <a href="#" className="text-[#FFC100] font-bold">Cadastre-se</a></p>
                        </div>
                    </form>
                </div>


                <div className='hidden w-full max-w-md bg-[#1f1f1f] p-8 rounded-xl shadow-md text-white'>
                    <form>
                        <div className='mb-4'>
                            <InputCampo
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder={"Digite seu Email"}
                            />
                        </div>
                        <div className='mb-4'>
                            <InputCampo
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder={"Confirme seu Email"}
                            />
                        </div>
                        <div className='mb-4'>
                            <InputCampo
                                type="password"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                placeholder={"Digite seu Senha"}
                            />
                            <div className="mt-4">
                                <InputCampo
                                    type="password"
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                    placeholder={"Confirme seu Senha"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-3 mt-6 p-4 rounded-lg">
                            <button type="submit" className='bg-white text-black font-semibold py-2 rounded hover:bg-red-100 hover:cursor-pointer'>Entrar</button>
                            <p>Já tem conta? <a href="#" className="text-[#FFC100] font-bold">Login!</a></p>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
