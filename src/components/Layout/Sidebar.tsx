import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Users, 
  BookOpen, 
  BarChart3, 
  UserCog, 
  Calendar,
  Settings,
  Home,
  TrendingUp,
  MessageCircle,
  FileText
} from 'lucide-react';



export default function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  const navigationItems = [
    { name: t('nav.dashboard'), href: '/', icon: Home },
    { name: t('nav.leadManagement'), href: '/leads', icon: Users },
    { name: t('nav.kanbanBoard'), href: '/kanban', icon: TrendingUp },
    { name: t('nav.courses'), href: '/courses', icon: BookOpen },
    { name: t('nav.whatsapp'), href: '/whatsapp', icon: MessageCircle },
    { name: t('nav.followUps'), href: '/followups', icon: Calendar },
    { name: t('nav.analytics'), href: '/analytics', icon: BarChart3 },
    { name: t('nav.counselors'), href: '/counselors', icon: UserCog },
    { name: t('nav.settings'), href: '/settings', icon: Settings },
    { name: 'Sales Report', href: '/sales-report', icon: FileText },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg h-full border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex flex-col items-center space-y-2">
          
    
          <div className="text-center">
            <h1 className="text-xl font-bold" style={{ color: '#8B0000', letterSpacing: 1 }}>
              DMHCA <span style={{ color: '#0A174E' }}>CRM</span>
            </h1>
            <p className="text-sm font-semibold" style={{ color: '#0A174E' }}>
              Medical Education
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-8">
        <div className="px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}