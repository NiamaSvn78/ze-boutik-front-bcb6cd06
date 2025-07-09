import React from 'react';
import { Card, CardContent } from './card';
import { Button } from './button';
import { 
  Package, 
  Search, 
  AlertCircle, 
  FileText, 
  ShoppingCart,
  Heart,
  Star,
  Users,
  Settings,
  HelpCircle
} from 'lucide-react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'error' | 'success' | 'warning';
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'package': Package,
  'search': Search,
  'alert-circle': AlertCircle,
  'file-text': FileText,
  'shopping-cart': ShoppingCart,
  'heart': Heart,
  'star': Star,
  'users': Users,
  'settings': Settings,
  'help-circle': HelpCircle,
};

const variantStyles = {
  default: {
    iconColor: 'text-gray-400',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  },
  error: {
    iconColor: 'text-red-400',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  success: {
    iconColor: 'text-green-400',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  warning: {
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  }
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'package',
  title,
  description,
  action,
  variant = 'default'
}) => {
  const IconComponent = iconMap[icon] || Package;
  const styles = variantStyles[variant];

  return (
    <Card className={`${styles.bgColor} ${styles.borderColor}`}>
      <CardContent className="p-8 text-center">
        <IconComponent className={`w-12 h-12 ${styles.iconColor} mx-auto mb-4`} />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}; 