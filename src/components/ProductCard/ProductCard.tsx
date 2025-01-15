import React from 'react'
import { useState, useEffect } from 'react'
import { Product } from '../../types/Product'
import { fetchProducts } from '../../services/ProductService'

const ProductCard = () => {
	const [searchProduct, setSearchProduct] = useState("")
	const [products, setProducts] = useState<Product[]>()
    const [product, setProduct] = useState<Product | null>()
    const [error, setError] = useState("")

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchProduct(e.target.value);
    }

    const findProduct = () => {
		let found;
        products?.map(p => {
			if (p.name.toLowerCase().includes(searchProduct.toLowerCase())) {
				found = p
			}
        })
        if (found) {
            setProduct(found)
            setError('')
        } else {
            setProduct(null)
            setError('No product found with the given name.')
        }
    }

	useEffect(() => {
		fetchProducts().then(res => setProducts(res));
	}, [])

	return (
		<div className='product-card'>
			<div className='search-section'>
				<label>Enter Product Name:</label>
				<input type="text" onChange={handleSearch}/>
				<button type="submit" onClick={findProduct}>Search</button>
			</div>
			{
				product
				?
				<div className='results-section'>
					<div className='product-info'>
						<img className='product-image' src={product?.image}/>
						<div className='product-details'>
							<p>ID: {product?.id}</p>
							<p>Name: {product?.name}</p>
							<p>Price: ${product?.price}</p>
							<p>Category: {product?.category}</p>
						</div>
					</div>
				</div>
				:
				<div className='error'>
					{error}
				</div>
			}
			
		</div>
	)
}

export default ProductCard