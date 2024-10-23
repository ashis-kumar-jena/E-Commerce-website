import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel"
import { json } from 'express';

// Function to add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload all images to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );
               const productData = {
                name,
                description,
                category,
                price : Number(price),
                bestseller: bestseller === "true" ? true :false,
                sizes: JSON.parse(sizes),
                Image: imagesUrl,
                date: Date.now()
               }
               console.log(productData)
               const product= new productModel(productData);
               await product.save()

               res.json({ success:true, message: "product Added"})

        // Respond with the uploaded image URLs and product data
        res.json({
            success: true,
            message: 'Product added successfully!',
            data: {
                name,
                description,
                price,
                category,
                subCategory,
                sizes,
                bestseller,
                images: imagesUrl,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list products
const listProducts = async (req, res) => {
    try {
        const products =await productModel.find({});
        res.json({ message: 'List products endpoint' });
        
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
        
    }
   
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message: "product Removed"})
        
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
        
    }
};

// Function to get single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
        
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
        
    }
};

export { addProduct, listProducts, removeProduct, singleProduct };
