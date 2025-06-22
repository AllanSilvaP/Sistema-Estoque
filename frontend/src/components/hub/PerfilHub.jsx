export default function PerfilHub() {
    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-[#F7F5F2] p-6">
            <h2 className="text-4xl font-bold text-[#12714D] mb-8">Olá [Nome_Usuário]</h2>

            <div className="w-full max-w-md bg-[#12714D] text-white rounded-xl shadow-2xl border-4 border-[#12714D] p-8 space-y-4">
                <p className="text-lg"><span className="font-semibold">Email:</span> teste@email.com</p>
                <p className="text-lg"><span className="font-semibold">Ativo:</span> Sim</p>
                <p className="text-lg"><span className="font-semibold">Cargo:</span> Gerente de Estoque</p>
                <p className="text-lg"><span className="font-semibold">Data:</span> 21/09/2008</p>
                <p className="text-lg"><span className="font-semibold">Localização:</span> rua 7</p>
            </div>
        </div>
    );
}