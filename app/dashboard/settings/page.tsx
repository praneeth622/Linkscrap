'use client';

import { useState } from 'react';
import { FontSelector } from '@/components/font-selector';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Save,
  Bell,
  Download,
  Shield,
  Key,
  Database,
  Globe,
  Users,
  Mail,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    weekly: true
  });

  const handleSave = () => {
    console.log('Settings saved');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-sf-pro text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
        </div>
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Profile Settings */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold font-sf-pro mb-6 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Profile Settings
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Young Alaska"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="young.alaska@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              type="text"
              defaultValue="LinkSnap Inc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              defaultValue="Business Development"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold font-sf-pro mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Appearance
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Theme Preference
            </label>
            <ThemeToggle />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Choose your preferred color scheme. System will automatically match your device settings.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Font Family
            </label>
            <FontSelector />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Select your preferred font for better readability and visual appeal.
            </p>
          </div>
        </div>
      </div>

      {/* API Settings */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold font-sf-pro mb-6 flex items-center gap-2">
          <Key className="w-5 h-5" />
          API Configuration
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                defaultValue="sk-1234567890abcdef"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Keep your API key secure. It allows access to your LinkSnap account.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate Limit (requests per minute)
            </label>
            <input
              type="number"
              defaultValue="100"
              min="1"
              max="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold font-sf-pro mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-gray-600">Get notified about extraction updates</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-gray-600">Browser notifications for real-time updates</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">SMS Notifications</div>
                <div className="text-sm text-gray-600">Text messages for critical updates</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium">Weekly Reports</div>
                <div className="text-sm text-gray-600">Summary of your extraction activity</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.weekly}
                onChange={(e) => setNotifications({...notifications, weekly: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-purple"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold font-sf-pro mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Data & Privacy
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">Data Retention</div>
              <div className="text-sm text-gray-600">How long to keep extracted data</div>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent outline-none">
              <option>30 days</option>
              <option>90 days</option>
              <option>1 year</option>
              <option>Forever</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">Export Data</div>
              <div className="text-sm text-gray-600">Download all your data</div>
            </div>
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <div className="font-medium text-red-700">Delete Account</div>
              <div className="text-sm text-red-600">Permanently delete your account and data</div>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Integration Settings */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold font-sf-pro mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Integrations
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">CRM Integration</div>
                <div className="text-sm text-gray-600">Sync data with your CRM</div>
              </div>
            </div>
            <button className="btn-secondary">Configure</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Download className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium">Zapier</div>
                <div className="text-sm text-gray-600">Automate workflows</div>
              </div>
            </div>
            <button className="btn-secondary">Connect</button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium">Webhook</div>
                <div className="text-sm text-gray-600">Real-time data updates</div>
              </div>
            </div>
            <button className="btn-secondary">Setup</button>
          </div>
        </div>
      </div>
    </div>
  );
}