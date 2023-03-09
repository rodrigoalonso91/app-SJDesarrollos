import DashboardIcon from '@mui/icons-material/Dashboard';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import MapIcon from '@mui/icons-material/Map';

export 	const modules = [
    {
        title: 'Master',
        description: 'Importación de planos para crear barrios.',
        icon: () => ( <MapIcon sx={{ color: '#1ea28f'}}/> ),
        authorizedUsers: ['Admin']
    },
    {
        title: 'Barrios',
        description: 'Control y gestión de Barrios.',
        icon: () => ( <DashboardIcon sx={{ color: '#1ea28f'}}/> ),
        authorizedUsers: ['Admin', 'Auditor', 'Proprietor']
    },
    {
        title: 'Vendedores',
        description: 'Administración de vendedores.',
        icon: () => ( <HandshakeIcon sx={{ color: '#1ea28f'}}/> ),
        authorizedUsers: ['Admin']
    },
    {
        title: 'Clientes',
        description: 'Administración de clientes.',
        icon: () => ( <Diversity1Icon sx={{ color: '#1ea28f'}}/> ),
        authorizedUsers: ['Admin']
    },
]