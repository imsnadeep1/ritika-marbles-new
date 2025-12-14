import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Package, ShoppingCart, Users } from 'lucide-react';
import { categories, products, clients } from '@/data/mock';

const AdminDashboard = () => {
  const stats = [
    {
      label: 'Total Categories',
      value: categories.length,
      icon: FolderOpen,
      color: 'bg-blue-500',
      link: '/admin/categories'
    },
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-green-500',
      link: '/admin/products'
    },
    {
      label: 'Total Orders',
      value: 0,
      icon: ShoppingCart,
      color: 'bg-orange-500',
      link: '#'
    },
    {
      label: 'Total Clients',
      value: clients.length,
      icon: Users,
      color: 'bg-purple-500',
      link: '#'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Products</h3>
            <Link to="/admin/products" className="text-[#1a5d4c] text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">₹{product.price.toLocaleString()}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Categories */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            <Link to="/admin/categories" className="text-[#1a5d4c] text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {categories.slice(0, 5).map((category) => (
              <div key={category.id} className="flex items-center gap-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{category.name}</p>
                  <p className="text-sm text-gray-500">
                    {products.filter(p => p.categoryId === category.id).length} products
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-[#1a5d4c] text-white rounded-lg hover:bg-[#154a3d] transition-colors"
          >
            Add New Product
          </Link>
          <Link
            to="/admin/categories"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Add New Category
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
