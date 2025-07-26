'use client';

import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'LISTA_COMPRAS_LS';

export default function Calc() {
    const [list, setList] = useState<ShopListItem[]>([]);

    const [descricao, setDescricao] = useState<string>('');
    const [valor, setValor] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);

    function addNewItemList() {
        if (isNaN(valor) || isNaN(quantidade)) return;

        const newList: ShopListItem[] = [
            ...list,
            {
                id: list.length,
                name: descricao,
                quantity: quantidade,
                value: valor,
            },
        ];
        setList(newList);
        saveListOnCache(newList);
    }

    function onDeleteItem(item: ShopListItem) {
        if (confirm(`Deletar ${item.name}?`)) {
            const newList = [...list];
            const itemIndex = list.indexOf(item);
            newList.splice(itemIndex, 1);
            setList(newList);
            saveListOnCache(newList);
        }
    }

    function saveListOnCache(newList: ShopListItem[]) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newList));
    }

    useEffect(() => {
        const result = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (result) {
            setList(JSON.parse(result));
        }
    }, []);

    return (
        <div>
            <RenderListItems items={list} deleteItem={onDeleteItem} />
            <hr />
            <div>
                <InputText
                    description="Descrição"
                    onChange={(value) => {
                        setDescricao(value);
                    }}
                />
                <div className="h-2" />
                <div className="flex row">
                    <InputText
                        description="Quantidade"
                        onChange={(value) => {
                            const newValor: number = +value;
                            setValor(
                                typeof newValor === 'number' ? newValor : 0
                            );
                        }}
                    />
                    <div className="w-2" />
                    <InputText
                        description="Valor"
                        onChange={(value) => {
                            const newQuantidade: number = +value;
                            setQuantidade(
                                typeof newQuantidade === 'number'
                                    ? newQuantidade
                                    : 0
                            );
                        }}
                    />
                </div>
                <div className="h-2" />
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full"
                    onClick={() => addNewItemList()}
                >
                    Adicionar
                </button>
            </div>
        </div>
    );
}

function RenderListItems({
    items,
    deleteItem,
}: {
    items: ShopListItem[];
    deleteItem: (item: ShopListItem) => void;
}) {
    return (
        <div>
            {items.length == 0 ? (
                <div>Sem itens</div>
            ) : (
                items.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="flex row"
                            onClick={() => deleteItem(item)}
                        >
                            <span className="w-auto grow">- {item.name}</span>
                            <div className="w-4" />
                            <div className="flex row">
                                <span className="ph-2">
                                    {item.quantity} x {item.value}
                                </span>
                                <div className="w-4" />
                                <span className="font-bold">
                                    {item.quantity * item.value}
                                </span>
                            </div>
                        </div>
                    );
                })
            )}
            <div className="w-full py-4 text-right">
                Total:{' '}
                {items
                    .map((e) => e.quantity * e.value)
                    .reduce((acc, curr) => acc + curr, 0)}
            </div>
        </div>
    );
}

function InputText({
    description,
    textType,
    onChange,
}: {
    description: string;
    textType?: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <input
                type={textType ?? 'text'}
                id="company"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={description}
                required
                onChange={(value) => onChange(value.target.value)}
            />
        </div>
    );
}

function deleteItem(item: ShopListItem) {}
