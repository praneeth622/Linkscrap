import Link from 'next/link';
import { ArrowRight, Database, Search, Users, Building2, Briefcase, FileText, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-purple to-primary-blue rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-sf-pro gradient-text">LinkSnap</h1>
          </div>
          <Link href="/dashboard" className="btn-secondary">
            Go to Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold font-sf-pro mb-6 text-gray-900">
            Effortless LinkedIn
            <span className="gradient-text"> Data Extraction</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Extract LinkedIn profiles, companies, jobs, and posts with powerful search capabilities. 
            Simply enter a URL, name, or keyword and let LinkSnap do the rest.
          </p>
          <Link href="/dashboard" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3">
            Launch Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <h3 className="text-4xl font-bold font-sf-pro text-center mb-16 text-gray-900">
          Powerful Features
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
              <Users className="w-8 h-8 text-primary-purple" />
            </div>
            <h4 className="text-xl font-semibold mb-4 font-sf-pro">Profile Extraction</h4>
            <p className="text-gray-600">Extract LinkedIn profiles by URL, name, or discover new connections</p>
          </div>
          
          <div className="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
              <Building2 className="w-8 h-8 text-primary-blue" />
            </div>
            <h4 className="text-xl font-semibold mb-4 font-sf-pro">Company Data</h4>
            <p className="text-gray-600">Comprehensive company information and employee insights</p>
          </div>
          
          <div className="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-200 transition-colors">
              <Briefcase className="w-8 h-8 text-teal" />
            </div>
            <h4 className="text-xl font-semibold mb-4 font-sf-pro">Job Listings</h4>
            <p className="text-gray-600">Find and extract job postings by keywords or company</p>
          </div>
          
          <div className="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
              <FileText className="w-8 h-8 text-success" />
            </div>
            <h4 className="text-xl font-semibold mb-4 font-sf-pro">Post Analytics</h4>
            <p className="text-gray-600">Analyze LinkedIn posts and articles for insights</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-6 py-20 bg-white rounded-3xl mx-6 shadow-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-bold font-sf-pro mb-8 text-gray-900">
              Why Choose LinkSnap?
            </h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-purple rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 font-sf-pro">Lightning Fast</h4>
                  <p className="text-gray-600">Extract data in seconds with our optimized algorithms</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 font-sf-pro">Smart Detection</h4>
                  <p className="text-gray-600">Automatically detects URL type and triggers appropriate extraction</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 font-sf-pro">Secure & Reliable</h4>
                  <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-purple to-primary-blue rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="metric-card">
                  <div className="text-3xl font-bold text-primary-purple mb-2">1,250</div>
                  <div className="text-sm text-gray-600">Profiles Extracted</div>
                </div>
                <div className="metric-card">
                  <div className="text-3xl font-bold text-primary-blue mb-2">450</div>
                  <div className="text-sm text-gray-600">Companies Found</div>
                </div>
                <div className="metric-card">
                  <div className="text-3xl font-bold text-teal mb-2">890</div>
                  <div className="text-sm text-gray-600">Jobs Analyzed</div>
                </div>
                <div className="metric-card">
                  <div className="text-3xl font-bold text-success mb-2">2,340</div>
                  <div className="text-sm text-gray-600">Posts Collected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-bold font-sf-pro mb-6 text-gray-900">
            Ready to Start Extracting?
          </h3>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of professionals who trust LinkSnap for their LinkedIn data needs.
          </p>
          <Link href="/dashboard" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-3">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-purple to-primary-blue rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold font-sf-pro gradient-text">LinkSnap</span>
          </div>
          <p>&copy; 2024 LinkSnap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}