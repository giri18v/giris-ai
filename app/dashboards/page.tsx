'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import CreateKeyModal from '../components/CreateKeyModal'
import EditKeyModal from '../components/EditKeyModal'
import DeleteKeyModal from '../components/DeleteKeyModal'
import Notification from '../components/Notification'
import Layout from '../components/Layout'

interface ApiKey {
  id: string
  name: string
  key: string
  usage: number
  user_id: string
  created_at: string
  limit_usage?: number
  usage_limit?: number
}

const Overview = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Gulla Giri',
    apiLimit: 1000,
    usedRequests: 0
  })
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingKey, setEditingKey] = useState(null)
  const [deletingKey, setDeletingKey] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchApiKeys()
      fetchCurrentPlan()
    }
  }, [status, router])

  const fetchApiKeys = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/collections', {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch API keys')
      }
      
      const data = await response.json()
      setApiKeys(data)
    } catch (error) {
      console.error('Error fetching API keys:', error)
      setError('Failed to fetch API keys')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCurrentPlan = async () => {
    // In a real application, you would fetch this from your backend
    setCurrentPlan({
      name: 'Gulla Giri',
      apiLimit: 1000,
      usedRequests: 0
    })
  }

  const handleCreateKey = async (newKey) => {
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newKey.name,
          key: `tvly-${Math.random().toString(36).substr(2, 9)}`,
          usage: 0,
          limit_usage: parseInt(newKey.limitUsage) || 0,  // Ensure integer
          usage_limit: parseInt(newKey.usageLimit) || 0   // Ensure integer
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create API key')
      }

      const data = await response.json()
      setApiKeys(prevKeys => [...prevKeys, data])
      setNotification("New API key created successfully")
    } catch (error) {
      console.error('Error creating new API key:', error)
      setNotification("Failed to create new API key")
    } finally {
      setIsCreateModalOpen(false)
    }
  }

  const handleEditKey = async (id, updatedKey) => {
    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedKey.name,
          limit_usage: updatedKey.limitUsage,
          usage_limit: updatedKey.usageLimit
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update API key')
      }

      const data = await response.json()
      setApiKeys(apiKeys.map(key => key.id === id ? data : key))
      setNotification("API key updated successfully")
    } catch (error) {
      console.error('Error updating API key:', error)
      setNotification("Failed to update API key")
    } finally {
      setIsEditModalOpen(false)
      setEditingKey(null)
    }
  }

  const handleDeleteKey = async (id) => {
    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete API key')
      }

      setApiKeys(apiKeys.filter(key => key.id !== id))
      setNotification("API key deleted successfully")
    } catch (error) {
      console.error('Error deleting API key:', error)
      setNotification("Failed to delete API key")
    } finally {
      setIsDeleteModalOpen(false)
      setDeletingKey(null)
    }
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key).then(() => {
      setCopiedKey(key)
      setNotification("API key copied to clipboard")
      setTimeout(() => setCopiedKey(null), 3000)
    }).catch(err => {
      console.error('Failed to copy:', err)
      setNotification("Failed to copy API key")
    })
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Overview</h1>
          <div className="flex items-center space-x-4">
            <span className="text-green-500 flex items-center text-sm sm:text-base">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Operational
            </span>
          </div>
        </div>
        
        {/* Current Plan Card */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 sm:p-6 mb-8 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <p className="text-sm opacity-90 mb-1">CURRENT PLAN</p>
              <h2 className="text-2xl sm:text-4xl font-bold">{currentPlan.name}</h2>
            </div>
            <button className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Manage Plan
            </button>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-2">API Limit</p>
            <div className="bg-white/20 rounded-full h-2 mb-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300" 
                style={{width: `${(currentPlan.usedRequests / currentPlan.apiLimit) * 100}%`}}
              ></div>
            </div>
            <p className="text-sm">{currentPlan.usedRequests}/{currentPlan.apiLimit} Requests</p>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg sm:text-xl font-semibold">API Keys</h3>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 
                transition-colors duration-200 text-sm sm:text-base"
            >
              + Create New Key
            </button>
          </div>
          
          {/* API Keys Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-2 pr-4">NAME</th>
                  <th className="pb-2 pr-4">USAGE</th>
                  <th className="pb-2 pr-4">KEY</th>
                  <th className="pb-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id} className="border-t">
                    <td className="py-4 pr-4">{key.name}</td>
                    <td className="py-4 pr-4">{key.usage}</td>
                    <td className="py-4 pr-4 font-mono text-sm">{key.key}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleCopyKey(key.key)}
                          className={`p-2 rounded-lg hover:bg-gray-100 ${copiedKey === key.key ? 'text-green-500' : 'text-gray-600'}`}
                        >
                          {copiedKey === key.key ? '✅' : '📋'}
                        </button>
                        <button 
                          onClick={() => {
                            setEditingKey(key)
                            setIsEditModalOpen(true)
                          }}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => {
                            setDeletingKey(key)
                            setIsDeleteModalOpen(true)
                          }}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        <CreateKeyModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateKey={handleCreateKey}
        />

        <EditKeyModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingKey(null)
          }}
          onEditKey={handleEditKey}
          keyData={editingKey}
        />

        <DeleteKeyModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setDeletingKey(null)
          }}
          onDeleteKey={() => handleDeleteKey(deletingKey?.id)}
          keyName={deletingKey?.name}
        />

        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </Layout>
  )
}

export default Overview
