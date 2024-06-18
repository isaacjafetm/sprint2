import React, { useState } from 'react';
import '../styles/orderproduct.css';

const OrderProduct = () => {
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const products = [
        { id: 1, name: 'Bicicleta de Montaña', price: 500, stock: 5 },
        { id: 2, name: 'Bicicleta de Ruta', price: 600, stock: 0 }, // Ejemplo de producto sin stock
        { id: 3, name: 'Bicicleta Eléctrica', price: 800, stock: 3 },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verificar si hay productos disponibles
        if (products.length === 0) {
            alert('No hay productos disponibles actualmente.');
            return;
        }

        // Verificar si el producto seleccionado tiene stock
        const selectedProduct = products.find(p => p.name === product);
        if (!selectedProduct || selectedProduct.stock === 0) {
            alert('El producto seleccionado no tiene stock disponible.');
            return;
        }

        // Aquí podrías implementar la lógica para enviar la orden, guardar en una base de datos, etc.
        console.log('Orden enviada:', { product, quantity, fullName, email, phone });
        // Limpia los campos después del envío
        setProduct('');
        setQuantity(1);
        setFullName('');
        setEmail('');
        setPhone('');
    };

    return (
        <div className="order-container">
            <h2>Orden de Producto</h2>
            {products.length === 0 && <p>No hay productos disponibles actualmente.</p>}
            <form onSubmit={handleSubmit}>
                {products.length > 0 && (
                    <>
                        <div className="form-group">
                            <label htmlFor="product">Producto:</label>
                            <select
                                id="product"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                required
                            >
                                <option value="">Selecciona un producto</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.name} disabled={p.stock === 0}>{p.name} - ${p.price} {p.stock === 0 ? '(No stock)' : `(${p.stock} disponibles)`}</option>
                                ))}
                            </select>
                        </div>
                        {product && (
                            // eslint-disable-next-line
                            <div className="form-group">
                                <label htmlFor="quantity">Cantidad:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    min="1"
                                    max={products.find(p => p.name === product)?.stock || 1} // Limitar la cantidad al stock disponible
                                    required
                                />
                            </div>
                        )}
                    </>
                )}
                <div className="form-group">
                    <label htmlFor="fullName">Nombre Completo:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                {products.length > 0 && (
                    <button type="submit">Enviar Orden</button>
                )}
            </form>
        </div>
    );
};

export default OrderProduct;