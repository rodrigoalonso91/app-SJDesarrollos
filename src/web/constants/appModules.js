import DashboardIcon from '@mui/icons-material/Dashboard';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MapIcon from '@mui/icons-material/Map';

const iconColor = '#1ea28f';

export const modules = [
    {
        title: 'Master',
        description: 'Importación de planos para crear barrios.',
        icon: () => ( <MapIcon sx={{ color: iconColor }}/> ),
        authorizedUsers: ['Admin']
    },
    {
        title: 'Barrios',
        description: 'Control y gestión de Barrios.',
        icon: () => ( <DashboardIcon sx={{ color: iconColor }}/> ),
        authorizedUsers: ['Admin', 'Auditor', 'Proprietor']
    },
    {
        title: 'Vendedores',
        description: 'Administración de vendedores.',
        icon: () => ( <HandshakeIcon sx={{ color: iconColor }}/> ),
        authorizedUsers: ['Admin']
    },
    {
        title: 'Clientes',
        description: 'Administración de clientes.',
        icon: () => ( <Diversity1Icon sx={{ color: iconColor }}/> ),
        authorizedUsers: ['Admin']
    },
    {
        title: 'Administradores',
        description: 'Gestión de administradores de los lotes.',
        icon: () => ( <AccountCircleIcon sx={{ color: iconColor }}/> ),
        authorizedUsers: ['Admin']
    },
    {
        title: 'Resumen',
        description: 'Resumen mensual de las actividades.',
        icon: () => ( <SummarizeIcon sx={{ color: iconColor }}/> ),
        authorizedUsers: ['Admin']
    }
]