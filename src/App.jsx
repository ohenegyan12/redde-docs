import { useState, useEffect, useRef } from 'react';
import './index.css';
import {
  Search, Moon, Code2, Sun,
  Workflow, Wrench, LifeBuoy, Mail, ChevronLeft, ChevronRight, Play,
  Copy, Check
} from 'lucide-react';

const faqData = [
  {
    q: "What is the Redde API?",
    a: "The Redde API allows developers to integrate mobile money and payment functionality into their applications. You can use it to receive payments, send money, and track transactions programmatically."
  },
  {
    q: "How do I get access to the API?",
    a: "To start using the API, you need to:\n\n• Create a Redde account\n• Request API access\n• Receive your API key and App ID\n\nThese credentials are required to authenticate all API requests."
  },
  {
    q: "How does authentication work?",
    a: "All API requests must include your API key in the request headers. This key uniquely identifies your application and ensures secure access to the Redde services."
  },
  {
    q: "What can I do with the Redde API?",
    a: "With the API, you can:\n\n• Receive payments from customers\n• Send money to users\n• Check transaction status\n• Automate payment workflows\n\nThis makes it easy to integrate payments into web, mobile, or backend systems."
  },
  {
    q: "Which mobile networks are supported?",
    a: "The API supports major mobile money networks such as:\n\n• MTN\n• AirtelTigo\n• Vodafone\n\nThis enables you to process transactions across multiple providers."
  },
  {
    q: "How do I track payment status?",
    a: "You can track transactions using:\n\n• API status endpoints\n• Callback (webhook) notifications\n\nCallbacks are recommended because they provide real-time updates when a transaction is completed."
  },
  {
    q: "What are callbacks and why are they important?",
    a: "Callbacks (or webhooks) are URLs you provide so Redde can notify your system when a transaction status changes. They help you:\n\n• Confirm payments automatically\n• Update your database in real-time\n• Reduce the need for constant polling"
  },
  {
    q: "Do I need a backend server to use the API?",
    a: "Yes. For security reasons, API calls should be made from your backend server, not directly from frontend applications, to protect your API keys."
  },
  {
    q: "Is there a sandbox or test environment?",
    a: "Most payment APIs provide a test environment for development. You should request sandbox credentials from Redde before going live."
  },
  {
    q: "What happens if a transaction fails?",
    a: "If a transaction fails:\n\n• You will receive an error response from the API\n• The callback (if configured) will indicate failure\n• You can retry or notify the user accordingly"
  },
  {
    q: "How do I generate unique transaction references?",
    a: "Each transaction should include a unique reference ID (client reference) to help you track and reconcile payments. Many SDKs provide helper functions to generate these IDs."
  },
  {
    q: "Is the API secure?",
    a: "Yes, but you must follow best practices:\n\n• Keep your API key private\n• Use HTTPS for all requests\n• Validate callbacks from Redde"
  },
  {
    q: "Can I integrate Redde into a mobile app?",
    a: "Yes. You can integrate Redde into mobile apps via your backend, enabling features like in-app payments and mobile money collections."
  },
  {
    q: "How do I get support if I have issues?",
    a: "You can:\n\n• Check the developer documentation\n• Contact Redde support\n• Use community or integration guides"
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [activePage, setActivePage] = useState('welcome');
  const [checkoutMode, setCheckoutMode] = useState('test'); // 'test' or 'live'
  const [restMode, setRestMode] = useState('test'); // 'test' or 'live'
  const [openFaq, setOpenFaq] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('what-is-redde');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [copied, setCopied] = useState(null);
  const scrollContainerRef = useRef(null);
  const searchRef = useRef(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const searchableItems = [
    { title: 'What is Redde?', page: 'welcome', section: 'what-is-redde', tab: 'introduction' },
    { title: 'Explore the docs', page: 'welcome', section: 'explore-the-docs', tab: 'introduction' },
    { title: 'PHP SDK', page: 'sdks', tab: 'sdks-plugins' },
    { title: 'Java SDK', page: 'sdks', tab: 'sdks-plugins' },
    { title: 'Python SDK', page: 'sdks', tab: 'sdks-plugins' },
    { title: 'Node.js SDK', page: 'sdks', tab: 'sdks-plugins' },
    { title: 'C# SDK', page: 'sdks', tab: 'sdks-plugins' },
    { title: 'Woo Commerce Plugin', page: 'plugins', tab: 'sdks-plugins' },
    { title: 'Magento Plugin', page: 'plugins', tab: 'sdks-plugins' },
    { title: 'Shopify Plugin', page: 'plugins', tab: 'sdks-plugins' },
    { title: 'Checkout Welcome', page: 'welcome-api', tab: 'checkout-docs' },
    { title: 'Checkout Instructions', page: 'instructions', tab: 'checkout-docs' },
    { title: 'Debit and Credit API', page: 'debit-credit', tab: 'checkout-docs' },

    { title: 'Contact', page: 'contact', tab: 'introduction' },
    { title: 'FAQ', page: 'faq', tab: 'introduction' },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = searchableItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearchVisible(true);
    } else {
      setSearchResults([]);
      setIsSearchVisible(false);
    }
  };

  const navigateFromSearch = (item) => {
    setActiveTab(item.tab);
    setActivePage(item.page);
    if (item.section) {
      setTimeout(() => {
        const element = document.getElementById(item.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to handle tab switching
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'introduction') setActivePage('welcome');
    if (tabId === 'sdks-plugins') setActivePage('sdks');
    if (tabId === 'checkout-docs') setActivePage('welcome-api');
    if (tabId === 'rest-api') setActivePage('rest-welcome');
  };

  // Helper for mouse tracking spotlight
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container || activePage !== 'welcome') return;

      const sections = ['what-is-redde', 'explore-the-docs'];
      const topOffset = 100;

      // Check if we've reached the bottom
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;

      let currentSection = sections[0];
      if (isAtBottom) {
        currentSection = sections[sections.length - 1];
      } else {
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= topOffset) {
              currentSection = sectionId;
            }
          }
        }
      }
      setActiveSection(currentSection);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Run once on mount/page change
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activePage]);

  return (
    <div className={`app-container ${theme}-theme`}>
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-content">
          <div className="nav-top-row">
            {/* Logo and Version */}
            <div className="logo-section">
              <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src={theme === 'dark' ? "/logo.svg" : "/redde-logo-light.svg"} alt="Redde Logo" className="logo" />
              </a>
              <span className="version">v1</span>
            </div>

            {/* Search Bar */}
            <div className="search-container" ref={searchRef}>
              <Search className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchQuery.trim() && setIsSearchVisible(true)}
              />
              {isSearchVisible && searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((item, index) => (
                    <div
                      key={index}
                      className="search-result-item"
                      onClick={() => navigateFromSearch(item)}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Actions */}
            <div className="actions-section">
              <a href="#" className="support-link" onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}>Support</a>
              <button className="signup-btn">Sign Up </button>
              <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="nav-tabs">
            <button
              className={`tab-btn ${activeTab === 'introduction' ? 'active' : ''}`}
              onClick={() => handleTabChange('introduction')}
            >
              Introduction
            </button>
            <button
              className={`tab-btn ${activeTab === 'sdks-plugins' ? 'active' : ''}`}
              onClick={() => handleTabChange('sdks-plugins')}
            >
              Plugins and SDKs
            </button>
            <button
              className={`tab-btn ${activeTab === 'checkout-docs' ? 'active' : ''}`}
              onClick={() => handleTabChange('checkout-docs')}
            >
              Checkout Docs
            </button>
            <button
              className={`tab-btn ${activeTab === 'rest-api' ? 'active' : ''}`}
              onClick={() => handleTabChange('rest-api')}
            >
              Rest API Docs
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout (3 Columns) */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          {activeTab === 'introduction' && (
            <div className="sidebar-section">
              <h4 className="sidebar-title">Introduction</h4>
              <a
                href="#"
                className={`sidebar-link ${activePage === 'welcome' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('welcome'); }}
              >
                Welcome
              </a>
            </div>
          )}

          {activeTab === 'sdks-plugins' && (
            <div className="sidebar-section">
              <h4 className="sidebar-title">Plugins and SDKs</h4>
              <a
                href="#"
                className={`sidebar-link ${activePage === 'sdks' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('sdks'); }}
              >
                SDKs
              </a>
              <a
                href="#"
                className={`sidebar-link ${activePage === 'plugins' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setActivePage('plugins'); }}
              >
                Plugins
              </a>
            </div>
          )}

          {activeTab === 'rest-api' && (
            <>
              <div className="sidebar-section">
                <div className="mode-switch">
                  <button
                    className={`mode-btn ${restMode === 'test' ? 'active' : ''}`}
                    onClick={() => setRestMode('test')}
                  >
                    Test
                  </button>
                  <button
                    className={`mode-btn ${restMode === 'live' ? 'active' : ''}`}
                    onClick={() => setRestMode('live')}
                  >
                    Live
                  </button>
                </div>
              </div>

              <div className="sidebar-section">
                <h4 className="sidebar-title">API Navigation</h4>
                <a
                  href="#"
                  className={`sidebar-link ${activePage === 'rest-welcome' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActivePage('rest-welcome'); }}
                >
                  Welcome
                </a>
                <a
                  href="#"
                  className={`sidebar-link ${activePage === 'rest-instructions' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActivePage('rest-instructions'); }}
                >
                  Instructions
                </a>
              </div>

              <div className="sidebar-section">
                <h4 className="sidebar-title">Customer APIs</h4>
                <a
                  href="#"
                  className={`sidebar-link ${activePage === 'rest-debit' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActivePage('rest-debit'); }}
                >
                  Debit Money
                </a>
                <a
                  href="#"
                  className={`sidebar-link ${activePage === 'rest-credit' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActivePage('rest-credit'); }}
                >
                  Credit Money
                </a>
                <a
                  href="#"
                  className={`sidebar-link ${activePage === 'rest-check-status' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActivePage('rest-check-status'); }}
                >
                  Check Status
                </a>
                <a
                  href="#"
                  className={`sidebar-link ${activePage === 'rest-bank' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActivePage('rest-bank'); }}
                >
                  Sending to Bank
                </a>
              </div>
            </>
          )}

          {activeTab === 'checkout-docs' && (
            <>
              <div className="sidebar-section">
                <div className="mode-switch">
                  <button
                    className={`mode-btn ${checkoutMode === 'test' ? 'active' : ''}`}
                    onClick={() => setCheckoutMode('test')}
                  >
                    Test
                  </button>
                  <button
                    className={`mode-btn ${checkoutMode === 'live' ? 'active' : ''}`}
                    onClick={() => setCheckoutMode('live')}
                  >
                    Live
                  </button>
                </div>
              </div>

              <div className="sidebar-section">
                <h4 className="sidebar-title">API Navigation</h4>
                <a
                  href="#"
                  className={`sidebar-link ${activePage === 'welcome-api' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActivePage('welcome-api'); }}
                >
                  Welcome
                </a>
                <a
                  href="#"
                  className={`sidebar-link ${activePage === 'instructions' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActivePage('instructions'); }}
                >
                  Instructions
                </a>
              </div>

              <div className="sidebar-section">
                <h4 className="sidebar-title">Customer APIs</h4>
                <a
                  href="#"
                  className={`sidebar-link ${activePage === 'debit-credit' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setActivePage('debit-credit'); }}
                >
                  Debit and Credit
                </a>
              </div>
            </>
          )}

          <div className="sidebar-section">
            <h4 className="sidebar-title">Resources</h4>
            <a
              href="#"
              className={`sidebar-link ${activePage === 'contact' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}
            >
              Contact
            </a>
            <a
              href="#"
              className={`sidebar-link ${activePage === 'faq' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActivePage('faq'); }}
            >
              FAQ
            </a>
          </div>
        </aside>

        {/* Center Main Content */}
        <main className="main-content" ref={scrollContainerRef}>
          {activePage === 'welcome' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Introduction</span>
                <h1 id="what-is-redde" className="content-title">What is Redde?</h1>
                <p className="content-subtitle">Welcome to Redde!</p>
              </div>

              <img
                src="/images/banner.webp"
                alt="Redde Services"
                style={{ width: '100%', height: 'auto', borderRadius: '8px', margin: '32px 0 48px' }}
              />

              <div className="content-section">
                <h2>Build Something Brilliant with Redde's API</h2>
                <p>Redde is a system that allows merchants to receive payments for goods and services. You can use the <a href="https://app.reddeonline.com/login" target="_blank" rel="noopener noreferrer" style={{ color: '#E21B22', textDecoration: 'none', fontWeight: '600' }}>Redde portal</a> to sweep your money into your bank account. Transactions via Redde happen online via a web browser or our Redde app available for iOS, Windows. And Android.</p>
                <p style={{ marginTop: '16px' }}>Redde provides a secure, easy and convenient method of making online payments for products and services.</p>
              </div>

              <div className="cards-grid">
                <div className="feature-card intro-card" onMouseMove={handleMouseMove}>
                  <div className="card-icon"><img src="/icons/integrate.svg" alt="Integrate" width="24" height="24" /></div>
                  <h3>Integrate Redde into your System</h3>
                  <p>Do you need access to an online payment service for easy integration? Look no further, Choose Redde. It is Safe, Fast and Secure.</p>
                </div>

                <div className="feature-card intro-card" onMouseMove={handleMouseMove}>
                  <div className="card-icon"><img src="/icons/home.svg" alt="Home" width="24" height="24" /></div>
                  <h3>Have your Peace of Mind</h3>
                  <p>Manage your returns, order tracking, and more in the Redde Admin.</p>
                </div>
              </div>

              <div className="content-section">
                <h2 id="explore-the-docs" className="section-title-no-border">Explore the docs</h2>
                <p>Explore our integration guides, SDK reference, and API documentation to get started integrating with Redde.</p>
              </div>

              <div className="cards-grid">
                <div className="feature-card" onMouseMove={handleMouseMove}>
                  <div className="card-icon"><Code2 size={24} /></div>
                  <h3>SDKs</h3>
                  <p>Integrate Redde into your application using our official SDKs.</p>
                </div>
                <div className="feature-card" onMouseMove={handleMouseMove}>
                  <div className="card-icon"><Workflow size={24} /></div>
                  <h3>Checkout SDKs</h3>
                  <p>Quickly set up a seamless checkout experience with our specialized SDKs.</p>
                </div>
                <div className="feature-card" onMouseMove={handleMouseMove}>
                  <div className="card-icon"><Wrench size={24} /></div>
                  <h3>Rest API Docs</h3>
                  <p>Comprehensive documentation for our RESTful endpoints.</p>
                </div>
                <div className="feature-card" onMouseMove={handleMouseMove}>
                  <div className="card-icon"><LifeBuoy size={24} /></div>
                  <h3>Support</h3>
                  <p>Need help? Check out our FAQs or contact support for assistance.</p>
                </div>
              </div>

              <div className="content-footer">
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}
                >
                  Contact <ChevronRight size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} />
                </a>
              </div>
            </>
          )}

          {activePage === 'sdks' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Plugins and SDKs</span>
                <h1 className="content-title">SDKs</h1>
                <p className="content-subtitle">Official Redde SDKs for different programming languages.</p>
              </div>

              <div className="sdk-grid">
                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">Redde-Php-SDK</h3>
                    <span className="sdk-badge">PHP</span>
                  </div>
                  <p className="sdk-status">active</p>
                  <a href="https://github.com/wigalgh/redde-php-sdk" target="_blank" rel="noopener noreferrer" className="sdk-source-link">Go to source code</a>
                </div>

                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">Redde-Java-SDK</h3>
                    <span className="sdk-badge">JAVA</span>
                  </div>
                  <p className="sdk-status">active</p>
                  <a href="https://github.com/wigalgh/redde-java-sdk" target="_blank" rel="noopener noreferrer" className="sdk-source-link">Go to source code</a>
                </div>

                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">Redde-Python-SDK</h3>
                    <span className="sdk-badge">PYTHON</span>
                  </div>
                  <p className="sdk-status">active</p>
                  <a href="https://github.com/wigalgh/reddePy" target="_blank" rel="noopener noreferrer" className="sdk-source-link">Go to source code</a>
                </div>

                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">Redde-NodeJs-SDK</h3>
                    <span className="sdk-badge">NODE JS</span>
                  </div>
                  <p className="sdk-status">active</p>
                  <a href="https://github.com/wigalgh/redde-nodejs-sdk" target="_blank" rel="noopener noreferrer" className="sdk-source-link">Go to source code</a>
                </div>

                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">Redde-CSharp-SDK</h3>
                    <span className="sdk-badge">C#</span>
                  </div>
                  <p className="sdk-status">active</p>
                  <a href="https://github.com/wigalgh/redde-sdk-CSharp" target="_blank" rel="noopener noreferrer" className="sdk-source-link">Go to source code</a>
                </div>
              </div>

              <div className="content-footer">
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('plugins'); }}
                >
                  Plugins <ChevronRight size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} />
                </a>
              </div>
            </>
          )}

          {activePage === 'plugins' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Plugins and SDKs</span>
                <h1 className="content-title">Plugins</h1>
                <p className="content-subtitle">E-commerce plugins for easy integration.</p>
              </div>

              <div className="sdk-grid">
                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">Woo Commerce</h3>
                    <span className="sdk-badge">WORDPRESS</span>
                  </div>
                  <p className="sdk-status">Active</p>
                  <a href="https://github.com/wigalgh/woocommerce-redde-payment-service" target="_blank" rel="noopener noreferrer" className="sdk-source-link">Go to source code</a>
                </div>

                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">Magento</h3>
                    <span className="sdk-badge">MAGENTO</span>
                  </div>
                  <p className="sdk-status">coming soon</p>
                </div>

                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">Shopify</h3>
                    <span className="sdk-badge">SHOPIFY</span>
                  </div>
                  <p className="sdk-status">coming soon</p>
                </div>

                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">Open Cart</h3>
                    <span className="sdk-badge">OPEN CART</span>
                  </div>
                  <p className="sdk-status">coming soon</p>
                </div>

                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">PrestaShop</h3>
                    <span className="sdk-badge">PRESTASHOP</span>
                  </div>
                  <p className="sdk-status">coming soon</p>
                </div>

                <div className="sdk-card" onMouseMove={handleMouseMove}>
                  <div className="sdk-card-top">
                    <h3 className="sdk-title">VirtueMart</h3>
                    <span className="sdk-badge">VIRTUEMART</span>
                  </div>
                  <p className="sdk-status">coming soon</p>
                </div>
              </div>

              <div className="content-footer" style={{ justifyContent: 'flex-start' }}>
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('sdks'); }}
                >
                  <ChevronLeft size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} /> SDKs
                </a>
              </div>
            </>
          )}

          {activeTab === 'checkout-docs' && activePage === 'welcome-api' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Checkout Docs • <span style={{ color: checkoutMode === 'live' ? '#E21B22' : 'inherit' }}>{checkoutMode.toUpperCase()}</span></span>
                <h1 className="content-title">Welcome to Redde's Checkout Docs</h1>
                <p className="content-subtitle">Get started with the {checkoutMode} environment for Checkout.</p>
              </div>
              <div className="content-section">
                <p>Redde is a system that allows merchants to receive payments for goods and services. You can use the <a href="https://app.reddeonline.com/login" target="_blank" rel="noopener noreferrer" style={{ color: '#E21B22', textDecoration: 'none', fontWeight: '600' }}>Redde portal</a> to sweep your money into your bank account. Transactions via Redde happen online via a web browser or our Redde app available for iOS, Windows. And Android.</p>
                <p style={{ marginTop: '16px' }}>Redde provides a secure, easy and convenient method of making online payments for products and services.</p>
              </div>
              <div className="content-footer">
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('instructions'); }}
                >
                  Instructions <ChevronRight size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} />
                </a>
              </div>
            </>
          )}

          {activeTab === 'checkout-docs' && activePage === 'instructions' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Checkout Docs • <span style={{ color: checkoutMode === 'live' ? '#E21B22' : 'inherit' }}>{checkoutMode.toUpperCase()}</span></span>
                <h1 className="content-title">Instructions</h1>
                <p className="content-subtitle">Integration steps and requirements for {checkoutMode} mode.</p>
              </div>

              <div className="content-section">
                <h2 className="section-title">API Key</h2>
                <p>Before you can have access to APIs you need to register and create an <a href="https://app.reddeonline.com/register" target="_blank" rel="noopener noreferrer" style={{ color: '#E21B22', textDecoration: 'none', fontWeight: '600' }}>Account</a>. Header for all request should have <code style={{ color: '#E21B22', backgroundColor: 'transparent', padding: 0 }}>{`{"apikey": "string"}`}</code> and this API key will be sent to merchant when their app configuration is setup for them by Wigal.</p>
              </div>

              <div className="content-section">
                <h2 className="section-title">Approval</h2>
                <p>One will be given access to modify their API callbacks once they are approved to do so. To be approved, one needs to upload their Genuine details to the Account Profile Section under the Account Page. And complete the Business Information and contacts, Primary Contact Person and Documentation pages. Upon successful review by the Redde Team, approval will be granted.</p>
              </div>

              <div className="content-section">
                <h2 className="section-title">Status Responses</h2>
                <p>For more information on status response check it out on the <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('rest-api'); }} style={{ color: '#E21B22', textDecoration: 'none', fontWeight: '600' }}>Rest API Docs</a> page.</p>
              </div>

              <div className="content-section">
                <h2 className="section-title">Supported Channels</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                  {['MTN', 'AIRTELTIGO', 'VODAFONE', 'MASTERCARD', 'VISA'].map(channel => (
                    <span key={channel} style={{
                      backgroundColor: 'var(--search-bg)',
                      padding: '6px 16px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)'
                    }}>
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              <div className="content-section">
                <h2 className="section-title">Callbacks</h2>
                <p>You need to setup your callback URL for the apps we create for you on Redde:</p>
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    "Login to your Redde account",
                    "Click on the Apps link on the navigation bar",
                    "You will see your list of apps in a table. Click on the modify button",
                    "Add your callback url(s) for both the Receive Callback URL and Cash Out Callback URL",
                    "Apply changes and you are all set."
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ backgroundColor: '#E21B22', color: 'white', width: '20px', height: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>
                        {i + 1}
                      </span>
                      <p style={{ margin: 0 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-footer" style={{ justifyContent: 'space-between' }}>
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('welcome-api'); }}
                >
                  <ChevronLeft size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} /> Welcome
                </a>
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('debit-credit'); }}
                >
                  Debit and Credit <ChevronRight size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} />
                </a>
              </div>
            </>
          )}

          {activeTab === 'checkout-docs' && activePage === 'debit-credit' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Checkout Docs • <span style={{ color: checkoutMode === 'live' ? '#E21B22' : 'inherit' }}>{checkoutMode.toUpperCase()}</span></span>
                <h1 className="content-title">Debit and Credit</h1>
                <p className="content-subtitle">Collect funds from customers or send payouts.</p>
              </div>
              <div className="content-section">
                <h2 className="section-title">Customer API (Checkout)</h2>
                <p style={{ fontWeight: '500', marginBottom: '16px' }}>Initiate an online checkout by Merchant</p>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Gather amount and description from client or customer on your site where you have implemented the Redde Checkout and set your site details</p>

                <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>
                  Endpoint: <span style={{ color: '#E21B22' }}>POST</span>
                </p>

                <div style={{
                  backgroundColor: '#1E1E1E',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: '#CFCFD5',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{checkoutMode === 'live' ? 'https://api.reddeonline.com/v1/checkout/' : 'https://demoapi.reddeonline.com/v1/checkout/'}</span>
                  <button
                    onClick={() => handleCopy(checkoutMode === 'live' ? 'https://api.reddeonline.com/v1/checkout/' : 'https://demoapi.reddeonline.com/v1/checkout/', 'checkout-url')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copied === 'checkout-url' ? '#10B981' : '#888888',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'color 0.2s'
                    }}
                    title="Copy URL"
                  >
                    {copied === 'checkout-url' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 className="doc-table-title">Header data</h3>
                  <div className="doc-table-wrapper">
                    <table className="doc-table">
                      <thead>
                        <tr>
                          <th>Field / Parameter</th>
                          <th>Value</th>
                          <th>Required</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Content-Type</td>
                          <td>application/json;charset=UTF-8</td>
                          <td>Yes</td>
                          <td>this is needed to encode to UTF-8</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 className="doc-table-title">Payload description</h3>
                  <div className="doc-table-wrapper">
                    <table className="doc-table">
                      <thead>
                        <tr>
                          <th>Field / Parameter</th>
                          <th>Type</th>
                          <th>Required</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>apikey</td>
                          <td>string</td>
                          <td>Yes</td>
                          <td>will be given by wigal when the app is setup</td>
                        </tr>
                        <tr>
                          <td>appid</td>
                          <td>characters</td>
                          <td>Yes</td>
                          <td>will be given by wigal when the app is setup</td>
                        </tr>
                        <tr>
                          <td>amount</td>
                          <td>number</td>
                          <td>Yes</td>
                          <td>Amount of items purchased</td>
                        </tr>
                        <tr>
                          <td>description</td>
                          <td>string</td>
                          <td>Yes</td>
                          <td>Description of items purchased</td>
                        </tr>
                        <tr>
                          <td>logolink</td>
                          <td>url</td>
                          <td>Yes</td>
                          <td>Merchant's logo for displaying on checkout page</td>
                        </tr>
                        <tr>
                          <td>merchatname</td>
                          <td>string</td>
                          <td>Yes</td>
                          <td>Merchant's name for displaying on checkout page</td>
                        </tr>
                        <tr>
                          <td>clienttransid</td>
                          <td>string</td>
                          <td>Yes</td>
                          <td>Transaction id generated by Merchant to check client's payment transactions</td>
                        </tr>
                        <tr>
                          <td>successcallback</td>
                          <td>url</td>
                          <td>Yes</td>
                          <td>A callback url to redirect client when payment transaction has been successful</td>
                        </tr>
                        <tr>
                          <td>failurecallback</td>
                          <td>url</td>
                          <td>Yes</td>
                          <td>A callback url to redirect client when payment transaction has failed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 className="doc-table-title">Sample Payload:</h3>
                  <div style={{
                    backgroundColor: '#1E1E1E',
                    padding: '24px',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    color: '#CFCFD5',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    position: 'relative'
                  }}>
                    <button
                      onClick={() => handleCopy(`{
  "amount": 10,
  "apikey": "XXXXXXXXXXXXXXXXXXXXXXX",
  "appid": XX,
  "description": "Buying something from Merchant Name Limited",
  "failurecallback": "https://www.example.com/failure",
  "logolink": "http://example.com/logo.png",
  "merchantname": "Merchant Name Limited",
  "clienttransid": "102474",
  "successcallback": "https://example.com/success"
}`, 'sample-payload')}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        color: copied === 'sample-payload' ? '#10B981' : '#888888',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s'
                      }}
                      title="Copy Payload"
                    >
                      {copied === 'sample-payload' ? <Check size={16} /> : <Copy size={16} />}
                    </button>

                    <div style={{ marginBottom: '8px', color: '#888888' }}>Payload:</div>
                    <div style={{ lineHeight: '1.6' }}>
                      <span style={{ color: '#ffffff' }}>{'{'}</span><br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"amount"</span>: <span style={{ color: '#c19ff0' }}>10</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"apikey"</span>: <span style={{ color: '#d1e189' }}>"XXXXXXXXXXXXXXXXXXXXXXX"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"appid"</span>: <span style={{ color: '#c19ff0' }}>XX</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"description"</span>: <span style={{ color: '#d1e189' }}>"Buying something from Merchant Name Limited"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"failurecallback"</span>: <span style={{ color: '#d1e189' }}>"https://www.example.com/failure"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"logolink"</span>: <span style={{ color: '#d1e189' }}>"http://example.com/logo.png"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"merchantname"</span>: <span style={{ color: '#d1e189' }}>"Merchant Name Limited"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clienttransid"</span>: <span style={{ color: '#d1e189' }}>"102474"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"successcallback"</span>: <span style={{ color: '#d1e189' }}>"https://example.com/success"</span><br />
                      <span style={{ color: '#ffffff' }}>{'}'}</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 className="doc-table-title">Sample Response: Checkout Initiation</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    After a successful initiation a checkout url will be given for transaction to be processed. Merchant will have to redirect client this url.
                  </p>

                  <div style={{
                    backgroundColor: '#1E1E1E',
                    padding: '24px',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    color: '#CFCFD5',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    position: 'relative'
                  }}>
                    <button
                      onClick={() => handleCopy(`// Response: Success Initiation
{
"status": "OK",
"reason": "Checkout Initiation accepted",
"referenceid": "102474",
"responsetoken": "M7M9yLhyKa18q4JjAOisXmaZ+PaTuOTUouYDdXnSQq4=",
"checkouturl": "https://checkout.reddeonline.com?token=M7M9yLhyKa18q4JjAOisXmaZ%2BPaTuOTUouYDdXnSQq4%3D",
"checkouttransid": 54
}

// Response: Failure Initiation
{
"status": "FAILED",
"reason": "APP ID:1 cannot be found",
"referenceid": null,
"responsetoken": null,
"checkouturl": null,
"checkouttransid": null
}`, 'initiation-response')}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        color: copied === 'initiation-response' ? '#10B981' : '#888888',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s'
                      }}
                      title="Copy Response"
                    >
                      {copied === 'initiation-response' ? <Check size={16} /> : <Copy size={16} />}
                    </button>

                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ color: '#888888', marginBottom: '8px' }}>Response: Success Initiation</div>
                      <div style={{ lineHeight: '1.6' }}>
                        <span style={{ color: '#ffffff' }}>{'{'}</span><br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"status"</span>: <span style={{ color: '#d1e189' }}>"OK"</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"reason"</span>: <span style={{ color: '#d1e189' }}>"Checkout Initiation accepted"</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"referenceid"</span>: <span style={{ color: '#d1e189' }}>"102474"</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"responsetoken"</span>: <span style={{ color: '#d1e189' }}>"M7M9yLhyKa18q4JjAOisXmaZ+PaTuOTUouYDdXnSQq4="</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"checkouturl"</span>: <span style={{ color: '#d1e189' }}>"https://checkout.reddeonline.com?token=M7M9yLhyKa18q4JjAOisXmaZ%2BPaTuOTUouYDdXnSQq4%3D"</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"checkouttransid"</span>: <span style={{ color: '#c19ff0' }}>54</span><br />
                        <span style={{ color: '#ffffff' }}>{'}'}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '24px' }}>
                      <div style={{ color: '#888888', marginBottom: '8px' }}>Response: Failure Initiation</div>
                      <div style={{ lineHeight: '1.6' }}>
                        <span style={{ color: '#ffffff' }}>{'{'}</span><br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"status"</span>: <span style={{ color: '#d1e189' }}>"FAILED"</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"reason"</span>: <span style={{ color: '#d1e189' }}>"APP ID:1 cannot be found"</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"referenceid"</span>: <span style={{ color: '#c19ff0' }}>null</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"responsetoken"</span>: <span style={{ color: '#c19ff0' }}>null</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"checkouturl"</span>: <span style={{ color: '#c19ff0' }}>null</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"checkouttransid"</span>: <span style={{ color: '#c19ff0' }}>null</span><br />
                        <span style={{ color: '#ffffff' }}>{'}'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-section" style={{ marginTop: '48px', paddingTop: '48px', borderTop: '1px solid var(--border-color)' }}>
                <h2 className="section-title" style={{ fontSize: '24px' }}>Check status of checkout transaction with ID</h2>

                <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>
                  Endpoint: <span style={{ color: '#22C55E' }}>GET</span>
                </p>

                <div style={{
                  backgroundColor: '#1E1E1E',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: '#CFCFD5',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>https://demoapi.reddeonline.com/v1/checkoutstatus/{'{checkouttransid}'}</span>
                  <button
                    onClick={() => handleCopy('https://demoapi.reddeonline.com/v1/checkoutstatus/{checkouttransid}', 'status-url')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copied === 'status-url' ? '#10B981' : '#888888',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'color 0.2s'
                    }}
                    title="Copy URL"
                  >
                    {copied === 'status-url' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 className="doc-table-title">Header data</h3>
                  <div className="doc-table-wrapper">
                    <table className="doc-table">
                      <thead>
                        <tr>
                          <th>Field / Parameter</th>
                          <th>Value</th>
                          <th>Required</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>apikey</td>
                          <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                          <td>Yes</td>
                          <td>merchant api key given to you by wigal</td>
                        </tr>
                        <tr>
                          <td>appid</td>
                          <td>xx</td>
                          <td>Yes</td>
                          <td>merchant app id given to you by wigal</td>
                        </tr>
                        <tr>
                          <td>Content-Type</td>
                          <td>application/json;charset=UTF-8</td>
                          <td>Yes</td>
                          <td>this is needed to encode to UTF-8</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 className="doc-table-title">Url Parameter</h3>
                  <div className="doc-table-wrapper">
                    <table className="doc-table">
                      <thead>
                        <tr>
                          <th>Field / Parameter</th>
                          <th>Value</th>
                          <th>Required</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>checkouttransid</td>
                          <td>number</td>
                          <td>Yes</td>
                          <td>transaction id from checkout initiation</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 className="doc-table-title">Sample Response for checkout transaction status</h3>
                  <div style={{
                    backgroundColor: '#1E1E1E',
                    padding: '24px',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    color: '#CFCFD5',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    position: 'relative'
                  }}>
                    <button
                      onClick={() => handleCopy(`{
"status": "PAID",
"reason": "Successfully processed transaction.",
"transactionid": 414494,
"clienttransid": "102486",
"clientreference": "REDDE-CHECKOUT-72",
"statusdate": "2019-05-15 12:02:13.732",
"brandtransid": "5865016103"
}`, 'status-response')}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        color: copied === 'status-response' ? '#10B981' : '#888888',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s'
                      }}
                      title="Copy Response"
                    >
                      {copied === 'status-response' ? <Check size={16} /> : <Copy size={16} />}
                    </button>

                    <div style={{ marginBottom: '8px', color: '#888888' }}>Response:</div>
                    <div style={{ lineHeight: '1.6' }}>
                      <span style={{ color: '#ffffff' }}>{'{'}</span><br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"status"</span>: <span style={{ color: '#d1e189' }}>"PAID"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"reason"</span>: <span style={{ color: '#d1e189' }}>"Successfully processed transaction."</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"transactionid"</span>: <span style={{ color: '#c19ff0' }}>414494</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clienttransid"</span>: <span style={{ color: '#d1e189' }}>"102486"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clientreference"</span>: <span style={{ color: '#d1e189' }}>"REDDE-CHECKOUT-72"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"statusdate"</span>: <span style={{ color: '#d1e189' }}>"2019-05-15 12:02:13.732"</span>,<br />
                      &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"brandtransid"</span>: <span style={{ color: '#d1e189' }}>"5865016103"</span><br />
                      <span style={{ color: '#ffffff' }}>{'}'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-footer" style={{ justifyContent: 'flex-start' }}>
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('instructions'); }}
                >
                  <ChevronLeft size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} /> Instructions
                </a>
              </div>

            </>
          )}

          {activeTab === 'rest-api' && activePage === 'rest-welcome' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Rest API Docs • <span style={{ color: restMode === 'live' ? '#E21B22' : 'inherit' }}>{restMode.toUpperCase()}</span></span>
                <h1 className="content-title">Welcome to Redde's API Docs</h1>
                <p className="content-subtitle">Get started with the {restMode} environment for the Rest API.</p>
              </div>
              <div className="content-section">
                <p>Redde is a system that allows merchants to receive payments for goods and services. You can use the <a href="https://app.reddeonline.com/login" target="_blank" rel="noopener noreferrer" style={{ color: '#E21B22', textDecoration: 'none', fontWeight: '600' }}>Redde portal</a> to sweep your money into your bank account. Transactions via Redde happen online via a web browser or our Redde app available for iOS, Windows. And Android.</p>
                <p style={{ marginTop: '16px' }}>Redde provides a secure, easy and convenient method of making online payments for products and services.</p>
              </div>
              <div className="content-footer">
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('rest-instructions'); }}
                >
                  Instructions <ChevronRight size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} />
                </a>
              </div>
            </>
          )}

          {activeTab === 'rest-api' && activePage === 'rest-instructions' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Rest API Docs • <span style={{ color: restMode === 'live' ? '#E21B22' : 'inherit' }}>{restMode.toUpperCase()}</span></span>
                <h1 className="content-title">Instructions</h1>
                <p className="content-subtitle">Integration steps and requirements for {restMode} mode.</p>
              </div>

              <div className="content-section">
                <h2 className="section-title">API Key</h2>
                <p>Before you can have access to APIs you need to register and create an <a href="https://app.reddeonline.com/register" target="_blank" rel="noopener noreferrer" style={{ color: '#E21B22', textDecoration: 'none', fontWeight: '600' }}>Account</a>. Header for all request should have <code style={{ color: '#E21B22', backgroundColor: 'transparent', padding: 0 }}>{`{"apikey": "string"}`}</code> and this API key will be sent to merchant when their app configuration is setup for them by Wigal.</p>
              </div>

              <div className="content-section">
                <h2 className="section-title">Approval</h2>
                <p>One will be given access to modify their API callbacks once they are approved to do so. To be approved, one needs to upload their Genuine details to the Account Profile Section under the Account Page. And complete the Business Information and contacts, Primary Contact Person and Documentation pages. Upon successful review by the Redde Team, approval will be granted.</p>
              </div>

              <div className="content-section">
                <h2 className="section-title">Status Responses</h2>
                <p>These are statuses we send during transactions. On initial response (first response) an <span style={{ color: '#22C55E', fontWeight: '600' }}>OK</span> or <span style={{ color: '#E21B22', fontWeight: '600' }}>FAILED</span> response can be sent based on successful or failed transaction. A <span style={{ color: '#E21B22', fontWeight: '600' }}>PENDING</span> or <span style={{ color: '#E21B22', fontWeight: '600' }}>PROGRESS</span> response is sent when transactions are being processed. And finally a <span style={{ color: '#22C55E', fontWeight: '600' }}>PAID</span> or <span style={{ color: '#22C55E', fontWeight: '600' }}>FAILED</span> status is sent when transaction has completed.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
                  {[
                    { label: 'OK', desc: 'First Response', color: '#22C55E' },
                    { label: 'FAILED', desc: 'First Response', color: '#E21B22' },
                    { label: 'PENDING', desc: 'Processing Response', color: '#E21B22' },
                    { label: 'PROGRESS', desc: 'Processing Response', color: '#E21B22' },
                    { label: 'PAID', desc: 'Final Response', color: '#22C55E' },
                    { label: 'FAILED', desc: 'Final Response', color: '#22C55E' },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                      <span style={{ color: s.color, fontWeight: '700', minWidth: '90px' }}>{s.label}</span>
                      <span style={{ color: 'var(--text-muted)' }}>({s.desc})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-section">
                <h2 className="section-title">Supported Channels</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                  {['MTN', 'AIRTELTIGO', 'VODAFONE'].map(channel => (
                    <span key={channel} style={{
                      backgroundColor: 'var(--search-bg)',
                      padding: '6px 16px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)'
                    }}>
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              <div className="content-section">
                <h2 className="section-title">Callbacks</h2>
                <p>You need to setup your callback URL for the apps we create for you on Redde:</p>
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    "Login to your Redde account",
                    "Click on the Apps link on the navigation bar",
                    "You will see your list of apps in a table. Click on the modify button",
                    "Add your callback url(s) for both the Receive Callback URL and Cash Out Callback URL",
                    "Apply changes and you are all set."
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ backgroundColor: '#E21B22', color: 'white', width: '20px', height: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>
                        {i + 1}
                      </span>
                      <p style={{ margin: 0 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-footer" style={{ justifyContent: 'flex-start' }}>
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('rest-welcome'); }}
                >
                  <ChevronLeft size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} /> Welcome
                </a>
              </div>
            </>
          )}

          {activeTab === 'rest-api' && activePage === 'rest-debit' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Rest API Docs • <span style={{ color: restMode === 'live' ? '#E21B22' : 'inherit' }}>{restMode.toUpperCase()}</span></span>
                <h1 className="content-title">Debit Money</h1>
                <p className="content-subtitle">Taking money out from customer wallet.</p>
              </div>

              <div className="content-section">
                <h2 className="section-title">Taking money out from customer wallet</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Debit (Taking money out from customer wallet) : That is customer paying a merchant for goods and services</p>

                <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '12px' }}>
                  Endpoint: <span style={{ color: '#E21B22' }}>POST</span>
                </p>

                <div style={{
                  backgroundColor: '#1E1E1E',
                  padding: '16px 24px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: '#CFCFD5',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{restMode === 'live' ? 'https://api.reddeonline.com/v1/receive' : 'https://demoapi.reddeonline.com/v1/receive'}</span>
                  <button
                    onClick={() => handleCopy(restMode === 'live' ? 'https://api.reddeonline.com/v1/receive' : 'https://demoapi.reddeonline.com/v1/receive', 'rest-debit-url')}
                    style={{ background: 'none', border: 'none', color: copied === 'rest-debit-url' ? '#10B981' : '#888888', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                    title="Copy URL"
                  >
                    {copied === 'rest-debit-url' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 className="doc-table-title">Header data</h3>
                  <div className="doc-table-wrapper">
                    <table className="doc-table">
                      <thead>
                        <tr>
                          <th>Field / Parameter</th>
                          <th>Value</th>
                          <th>Required</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>apikey</td>
                          <td>xxxxxxxxxxxxxxxxxx</td>
                          <td>Yes</td>
                          <td>merchant api key given to you by wigal</td>
                        </tr>
                        <tr>
                          <td>Content-Type</td>
                          <td>application/json;charset=UTF-8</td>
                          <td>Yes</td>
                          <td>this is needed to encode to UTF-8</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 className="doc-table-title">Payload description</h3>
                  <div className="doc-table-wrapper">
                    <table className="doc-table">
                      <thead>
                        <tr>
                          <th>Field / Parameter</th>
                          <th>Type</th>
                          <th>Required</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>amount</td>
                          <td>number</td>
                          <td>Yes</td>
                          <td>(2 decimal places allowed)</td>
                        </tr>
                        <tr>
                          <td>appid</td>
                          <td>characters</td>
                          <td>Yes</td>
                          <td>will be given by wigal when the app is setup</td>
                        </tr>
                        <tr>
                          <td>clientreference</td>
                          <td>string</td>
                          <td>Optional</td>
                          <td>client's reference</td>
                        </tr>
                        <tr>
                          <td>clienttransid</td>
                          <td>string</td>
                          <td>Yes</td>
                          <td>client's transaction id</td>
                        </tr>
                        <tr>
                          <td>description</td>
                          <td>string</td>
                          <td>Optional</td>
                          <td>A description for transaction</td>
                        </tr>
                        <tr>
                          <td>nickname</td>
                          <td>string</td>
                          <td>Yes</td>
                          <td>A nickname for merchant</td>
                        </tr>
                        <tr>
                          <td>paymentoption</td>
                          <td>string</td>
                          <td>Yes</td>
                          <td>Telcos (MTN, AIRTELTIGO, VODAFONE) all should be capitalized</td>
                        </tr>
                        <tr>
                          <td>walletnumber</td>
                          <td>string</td>
                          <td>Yes</td>
                          <td>Wallet Number here</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h3 className="doc-table-title">Sample Payload:</h3>
                <div style={{ backgroundColor: '#1E1E1E', padding: '24px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', color: '#CFCFD5', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                  <button
                    onClick={() => handleCopy(`{
  "amount": number,
  "appid": "string",
  "clientreference": "string",
  "clienttransid": "string",
  "description": "string",
  "nickname": "string",
  "paymentoption": "string",
  "walletnumber": "string"
}`, 'rest-debit-payload')}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: copied === 'rest-debit-payload' ? '#10B981' : '#888888', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                    title="Copy Payload"
                  >
                    {copied === 'rest-debit-payload' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <div style={{ marginBottom: '8px', color: '#888888' }}>Payload:</div>
                  <div style={{ lineHeight: '1.8' }}>
                    <span style={{ color: '#ffffff' }}>{'{'}</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"amount"</span>: <span style={{ color: '#c19ff0' }}>number</span>, <span style={{ color: '#888888' }}>(2 decimal places allowed)</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"appid"</span>: <span style={{ color: '#d1e189' }}>"string"</span>, <span style={{ color: '#888888' }}>will be given by wigal when the app is setup</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clientreference"</span>: <span style={{ color: '#d1e189' }}>"string"</span>, <span style={{ color: '#888888' }}>optional</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clienttransid"</span>: <span style={{ color: '#d1e189' }}>"string"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"description"</span>: <span style={{ color: '#d1e189' }}>"string"</span>, <span style={{ color: '#888888' }}>optional</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"nickname"</span>: <span style={{ color: '#d1e189' }}>"string"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"paymentoption"</span>: <span style={{ color: '#d1e189' }}>"string"</span>, <span style={{ color: '#888888' }}>(MTN | AIRTELTIGO | VODAFONE)</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"walletnumber"</span>: <span style={{ color: '#d1e189' }}>"string"</span><br />
                    <span style={{ color: '#ffffff' }}>{'}'}</span>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h3 className="doc-table-title">Sample Response: First Response</h3>
                <div style={{ backgroundColor: '#1E1E1E', padding: '24px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', color: '#CFCFD5', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                  <button
                    onClick={() => handleCopy(`{
  "status": "OK",
  "reason": "Transaction Recieved for Processing",
  "transactionid": "103046",
  "clienttransid": "wwzz0402",
  "statusdate": "2019-04-23 16:43:21.231"
}`, 'rest-debit-response1')}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: copied === 'rest-debit-response1' ? '#10B981' : '#888888', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                    title="Copy Response"
                  >
                    {copied === 'rest-debit-response1' ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <div style={{ marginBottom: '8px', color: '#888888' }}>Response: Initial</div>
                  <div style={{ lineHeight: '1.8' }}>
                    <span style={{ color: '#ffffff' }}>{'{'}</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"status"</span>: <span style={{ color: '#d1e189' }}>"OK"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"reason"</span>: <span style={{ color: '#d1e189' }}>"Transaction Recieved for Processing"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"transactionid"</span>: <span style={{ color: '#d1e189' }}>"103046"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clienttransid"</span>: <span style={{ color: '#d1e189' }}>"wwzz0402"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"statusdate"</span>: <span style={{ color: '#d1e189' }}>"2019-04-23 16:43:21.231"</span><br />
                    <span style={{ color: '#ffffff' }}>{'}'}</span>
                  </div>
                </div>
              </div>

              <div className="content-section">
                <h3 className="doc-table-title">Sample Response: Intermidiary(Processing) Response - This is sent to the receive callback url</h3>
                <div style={{ backgroundColor: '#1E1E1E', padding: '24px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', color: '#CFCFD5', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                  <button
                    onClick={() => handleCopy(`// Response: intermidiary
{
  "reason": "Accepted for Delivery 233243XXXXXX",
  "clienttransid": "XXXX",
  "clientreference": "XXXX",
  "transactionid": "XXXX",
  "statusdate": "YYYY-MM-DD H:mm:ss.sss",
  "status": "PROGRESS"
}

// Sample data
{
  "reason": "Accepted for Delivery 233243XXXXXX",
  "clienttransid": "wwzz0402",
  "clientreference": "780566",
  "transactionid": "103046",
  "statusdate": "2019-04-23 16:47:01.951",
  "status": "PROGRESS"
}`, 'rest-debit-response2')}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: copied === 'rest-debit-response2' ? '#10B981' : '#888888', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                    title="Copy Response"
                  >
                    {copied === 'rest-debit-response2' ? <Check size={16} /> : <Copy size={16} />}
                  </button>

                  {/* Template */}
                  <div style={{ marginBottom: '8px', color: '#888888' }}>Response: intermidiary</div>
                  <div style={{ lineHeight: '1.8', marginBottom: '24px' }}>
                    <span style={{ color: '#ffffff' }}>{'{'}</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"reason"</span>: <span style={{ color: '#d1e189' }}>"Accepted for Delivery 233243XXXXXX"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clienttransid"</span>: <span style={{ color: '#d1e189' }}>"XXXX"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clientreference"</span>: <span style={{ color: '#d1e189' }}>"XXXX"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"transactionid"</span>: <span style={{ color: '#d1e189' }}>"XXXX"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"statusdate"</span>: <span style={{ color: '#d1e189' }}>"YYYY-MM-DD H:mm:ss.sss"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"status"</span>: <span style={{ color: '#d1e189' }}>"PROGRESS"</span><br />
                    <span style={{ color: '#ffffff' }}>{'}'}</span>
                  </div>

                  {/* Sample data */}
                  <div style={{ marginBottom: '8px', color: '#888888' }}>Sample data</div>
                  <div style={{ lineHeight: '1.8' }}>
                    <span style={{ color: '#ffffff' }}>{'{'}</span><br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"reason"</span>: <span style={{ color: '#d1e189' }}>"Accepted for Delivery 233243XXXXXX"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clienttransid"</span>: <span style={{ color: '#d1e189' }}>"wwzz0402"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"clientreference"</span>: <span style={{ color: '#d1e189' }}>"780566"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"transactionid"</span>: <span style={{ color: '#d1e189' }}>"103046"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"statusdate"</span>: <span style={{ color: '#d1e189' }}>"2019-04-23 16:47:01.951"</span>,<br />
                    &nbsp;&nbsp;<span style={{ color: '#ef438a' }}>"status"</span>: <span style={{ color: '#d1e189' }}>"PROGRESS"</span><br />
                    <span style={{ color: '#ffffff' }}>{'}'}</span>
                  </div>
                </div>
              </div>

              <div className="content-footer" style={{ justifyContent: 'flex-start' }}>
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('rest-instructions'); }}
                >
                  <ChevronLeft size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} /> Instructions
                </a>
              </div>
            </>
          )}

          {activePage === 'contact' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Resources</span>
                <h1 className="content-title">Contact</h1>
              </div>

              <div className="cards-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '400px' }}>
                <div className="feature-card">
                  <div className="card-icon"><Mail size={24} /></div>
                  <h3>Support</h3>
                  <p>All general support inquiries</p>
                </div>
              </div>

              <div className="content-footer" style={{ justifyContent: 'space-between', borderTop: 'none' }}>
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('welcome'); }}
                >
                  <ChevronLeft size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} /> Welcome
                </a>
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('faq'); }}
                >
                  FAQ <ChevronRight size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} />
                </a>
              </div>
            </>
          )}

          {activePage === 'faq' && (
            <>
              <div className="content-header">
                <span className="content-breadcrumb">Resources</span>
                <h1 className="content-title">FAQ</h1>
              </div>

              <div className="faq-list">
                {faqData.map((item, index) => (
                  <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                    <div
                      className="faq-question"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <Play
                        size={10}
                        fill="currentColor"
                        className="faq-arrow"
                        style={{
                          transform: openFaq === index ? 'rotate(90deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                          marginRight: '12px',
                          color: '#CFCFD5'
                        }}
                      />
                      <span>{item.q}</span>
                    </div>
                    {openFaq === index && (
                      <div className="faq-answer">
                        <p style={{ whiteSpace: 'pre-line' }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="content-footer" style={{ justifyContent: 'flex-start', borderTop: 'none' }}>
                <a
                  href="#"
                  className="next-page-link"
                  onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}
                >
                  <ChevronLeft size={14} style={{ verticalAlign: 'middle', marginBottom: '2px' }} /> Contact
                </a>
              </div>
            </>
          )}

          <footer className="page-footer">
            <div className="footer-socials">
              <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFeSUwc7RMaqwAAAZyoTAAYlBV_MfHLlvesNVuXMJ-TAs4pUDbfXOcrEg4oshmX3QRGBEY-jzOWj11hRlsOErZC15mxbDBmTSZcjKFMvE3JEM80gU1bwKmdGhzpHy2uHPUR1wY=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fwigalgh%2Fposts%2F%3FfeedView%3Dall" target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" width="18" height="18" />
              </a>
              <a href="https://www.facebook.com/Wigalgh?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" width="18" height="18" />
              </a>
              <a href="https://www.instagram.com/wigalgh?igsh=MWQ4Z3dqZjZ2a2swOQ==" target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" width="18" height="18" />
              </a>
              <a href="https://github.com/wigalgh" target="_blank" rel="noopener noreferrer">
                <img src="/icons/github.svg" alt="GitHub" width="18" height="18" />
              </a>
            </div>
            <div className="footer-powered">
              Powered by <a href="https://wigal.com.gh/" target="_blank" rel="noopener noreferrer" className="footer-link">Wigal Vision</a>
            </div>
          </footer>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          {activePage === 'welcome' && (
            <div className="on-this-page">
              <h4 className="toc-title"><img src={theme === 'dark' ? "/icons/burger.svg" : "/icons/burger-light.svg"} alt="Table of Contents" width="12" height="12" /> On this page</h4>
              <a
                href="#what-is-redde"
                className={`toc-link ${activeSection === 'what-is-redde' ? 'active' : ''}`}
              >
                What is Redde?
              </a>
              <a
                href="#explore-the-docs"
                className={`toc-link ${activeSection === 'explore-the-docs' ? 'active' : ''}`}
              >
                Explore the docs
              </a>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
