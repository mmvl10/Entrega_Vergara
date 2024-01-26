import React, {useState, useEffect} from 'react';

const Components = () => {
    const [products, setProducts] = useState ([]);
    const [search, setSearch] = useState ('');
    const [newProducts, setNewProducts] = useState ({ products: '', detailproducts: '', price: '', quantity: ''});

    const searcher = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const addNewProducts = () => {
        if (newProducts.products && newProducts.detailproducts && newProducts.price && newProducts.quantity) {

            const newProductLowerCase = newProducts.products.toLowerCase();
          const newDetailLowerCase = newProducts.detailproducts.toLowerCase();
          

          const existingProduct = products.find(product =>
            product.products && product.products.toLowerCase() === newProductLowerCase &&
            product.detailproducts && product.detailproducts.toLowerCase() === newDetailLowerCase
          );
        
          if (!existingProduct) {
            const updatedProducts = [...products, newProducts];
            setProducts(updatedProducts);
            setNewProducts({ products: '', detailproducts: '', price: '', quantity: '' });
            localStorage.setItem('products', JSON.stringify(updatedProducts));
          } else {
            alert('El Producto ya existe');
          }
        }
      };
      
      




    const deleteProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const incrementQuantity = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity = (parseInt(updatedProducts[index].quantity, 10) + 1).toString();
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const decrementQuantity = (index) => {
        const updatedProducts = [...products];
        if (parseInt(updatedProducts[index].quantity, 10) > 0){
            updatedProducts[index].quantity = (parseInt(updatedProducts[index].quantity, 10) - 1).toString();
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
    };

    const loadProductsFromLocalStorage = () => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    };

    useEffect(() => {
        loadProductsFromLocalStorage();
    }, []);

    const filteredProducts = products.filter(product =>
        product && product.products && product.products.toLowerCase().includes(search)
      );
      


        return(
            <div className="container">
                <div className='input-container'>
                    <input
                    value={search}
                    onChange={searcher}
                    type='text'
                    placeholder='Buscar'
                    className='form-control'
                    />
                </div>
                <div>
                    <input
                    value={newProducts.products}
                    onChange={(e)=>
                    setNewProducts({ ...newProducts, products: e.target.value})
                }
                type='text'
                placeholder='Producto'
                />
                <input 
                value={newProducts.detailproducts}
                onChange={(e) => 
                setNewProducts ({ ...newProducts, detailproducts: e.target.value })
               }
               type="text"
               placeholder="Detalle del producto"
                />
                <input 
                value={newProducts.price}
                onChange={(e) => 
                    setNewProducts({ ...newProducts, price: e.target.value})
                }
                type='text'
                placeholder='Precio'
                />
                <input 
                value={newProducts.quantity}
                onChange={(e) =>
                    setNewProducts ({ ...newProducts, quantity: e.target.value})
                }
                type='text'
                placeholder='Cantidad'
                />
                <button onClick={addNewProducts}>Agregar Producto</button>
                </div>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr className='column text-white'>
                            <th>PRODUCTO</th>
                            <th>DETALLE DEL PRODUCTO</th>
                            <th>PRECIO</th>
                            <th>CANTIDAD</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={index}>
                                <td>{product.products}</td>
                                <td>{product.detailproducts}</td>
                                <td>{product.price}</td>
                                <td>
                                    {product.quantity}
                                    <button onClick={() => incrementQuantity(index)}
                                    style={{ marginLeft: '10px'}}>+</button>

                                    <button onClick={() => decrementQuantity(index)}
                                    style={{ marginLeft: '10px'}}>-</button>

                                </td>
                               <td>
                                <button onClick={() => deleteProduct(index)}>Eliminar</button>
                                </td> 
                            </tr>
                        ))}
                    
                    
                     </tbody>

                </table>
            </div>
        );

};

export default Components;