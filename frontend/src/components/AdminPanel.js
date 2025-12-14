import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, LogOut, Package, Grid, Image } from 'lucide-react';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [catResult, prodResult] = await Promise.all([
        window.storage.get('admin_categories').catch(() => null),
        window.storage.get('admin_products').catch(() => null)
      ]);

      if (catResult?.value) {
        setCategories(JSON.parse(catResult.value));
      }
      if (prodResult?.value) {
        setProducts(JSON.parse(prodResult.value));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveCategories = async (cats) => {
    try {
      await window.storage.set('admin_categories', JSON.stringify(cats));
      setCategories(cats);
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  const saveProducts = async (prods) => {
    try {
      await window.storage.set('admin_products', JSON.stringify(prods));
      setProducts(prods);
    } catch (error) {
      console.error('Error saving products:', error);
    }
  };

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const addCategory = async () => {
    if (!newCategory.name.trim()) {
      alert('Category name is required');
      return;
    }

    const category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      createdAt: new Date().toISOString()
    };

    const updated = [...categories, category];
    await saveCategories(updated);
    setNewCategory({ name: '', description: '' });
  };

  const deleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updated = categories.filter(c => c.id !== id);
      await saveCategories(updated);
      
      const updatedProducts = products.filter(p => p.category !== id);
      await saveProducts(updatedProducts);
    }
  };

  const updateCategory = async (id) => {
    const updated = categories.map(c =>
      c.id === id ? { ...c, ...editingCategory } : c
    );
    await saveCategories(updated);
    setEditingCategory(null);
  };

  const addProduct = async () => {
    if (!newProduct.name.trim() || !newProduct.price || !newProduct.category) {
      alert('Name, price, and category are required');
      return;
    }

    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProduct.image,
      stock: parseInt(newProduct.stock) || 0,
      createdAt: new Date().toISOString()
    };

    const updated = [...products, product];
    await saveProducts(updated);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      stock: ''
    });
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      await saveProducts(updated);
    }
  };

  const updateProduct = async (id) => {
    const updated = products.map(p =>
      p.id === id ? { ...p, ...editingProduct, price: parseFloat(editingProduct.price) } : p
    );
    await saveProducts(updated);
    setEditingProduct(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
              <Package className="w-12 h-12 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-gray-600 mt-2">Enter password to continue</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Password"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Login
          </button>
          <p className="text-sm text-gray-500 text-center mt-4">Default password: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'products'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5" />
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'categories'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Grid className="w-5 h-5" />
            Categories ({categories.length})
          </button>
        </div>

        {activeTab === 'categories' && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <button
                onClick={addCategory}
                className="mt-4 flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <Plus className="w-5 h-5" />
                Add Category
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-md p-6">
                  {editingCategory?.id === category.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-2 focus:border-purple-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={editingCategory.description}
                        onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-3 focus:border-purple-500 focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateCategory(category.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{category.description || 'No description'}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingCategory(category)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {categories.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Grid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No categories yet. Add your first category above.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none md:col-span-2 lg:col-span-1"
                  rows="1"
                />
              </div>
              <button
                onClick={addProduct}
                className="mt-4 flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => {
                const category = categories.find(c => c.id === product.category);
                
                return (
                  <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    {editingProduct?.id === product.id ? (
                      <div className="p-6">
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-2 focus:border-purple-500 focus:outline-none"
                        />
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-2 focus:border-purple-500 focus:outline-none"
                        />
                        <select
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-2 focus:border-purple-500 focus:outline-none"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          value={editingProduct.stock}
                          onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                          placeholder="Stock"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-2 focus:border-purple-500 focus:outline-none"
                        />
                        <textarea
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg mb-3 focus:border-purple-500 focus:outline-none"
                          rows="2"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateProduct(product.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <Image className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                            <span className="text-lg font-bold text-purple-600">${product.price}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{product.description || 'No description'}</p>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                              {category?.name || 'No Category'}
                            </span>
                            <span className="text-xs text-gray-500">Stock: {product.stock || 0}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {products.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No products yet. Add your first product above.</p>
                {categories.length === 0 && (
                  <p className="text-sm text-amber-600 mt-2">Tip: Create categories first before adding products</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
