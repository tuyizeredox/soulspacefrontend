import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
  Paper,
  Stack,
  Divider,
  useMediaQuery,
  IconButton,
  alpha,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Badge,
  Chip,
} from '@mui/material';
import {
  MonitorHeart,
  Medication,
  Security,
  Speed,
  Psychology,
  ArrowForward,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Notifications,
  Person,
  Home as HomeIcon,
  Info,
  ContactSupport,
  Article,
  Settings,
  Logout,
  Login,
  PersonAdd,
  Facebook,
  Twitter,
  LinkedIn,
  Star,
  EmojiEvents,
  WorkspacePremium,
  Groups,
  AutoGraph,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import FloatingMedical from '../../components/3d/FloatingMedical';
import ParticleBackground from '../../components/animations/ParticleBackground';
import { useColorMode } from '../../theme/ThemeContext';

const FeatureCard = ({ icon, title, description, index }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : 'background.paper',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.shadows[8],
            backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.light, 0.1),
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {React.cloneElement(icon, { 
              sx: { 
                fontSize: 48, 
                color: theme.palette.primary.main,
                filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : 'none',
              } 
            })}
          </Box>
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TestimonialCard = ({ name, role, image, content, rating }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : 'background.paper',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={image}
            sx={{
              width: 56,
              height: 56,
              mr: 2,
              border: `2px solid ${theme.palette.primary.main}`,
            }}
          />
          <Box>
            <Typography variant="h6" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', mb: 2 }}>
          {[...Array(rating)].map((_, index) => (
            <Star key={index} sx={{ color: theme.palette.warning.main }} />
          ))}
        </Box>
        <Typography variant="body1" sx={{ flex: 1, fontStyle: 'italic' }}>
          "{content}"
        </Typography>
      </Card>
    </motion.div>
  );
};

const AchievementCard = ({ icon, title, value, description }) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: '100%',
          bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.light, 0.1),
          borderRadius: 2,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {React.cloneElement(icon, {
            sx: { fontSize: 40, color: theme.palette.primary.main, mr: 2 }
          })}
          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
            {value}
          </Typography>
        </Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/,/g, ''));
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
};

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'About', icon: <Info />, path: '/about' },
    { label: 'Blog', icon: <Article />, path: '/blog' },
    { label: 'Contact', icon: <ContactSupport />, path: '/contact' },
  ];

  const features = [
    {
      icon: <MonitorHeart />,
      title: "Patient Monitoring",
      description: "Real-time monitoring of patient vitals and health metrics with instant alerts for critical changes."
    },
    {
      icon: <Medication />,
      title: "Prescription Management",
      description: "Digital prescription system with drug interaction checks and automated refill reminders."
    },
    {
      icon: <Security />,
      title: "Secure Records",
      description: "HIPAA-compliant secure storage and sharing of patient medical records and history."
    },
    {
      icon: <Speed />,
      title: "Quick Access",
      description: "Lightning-fast access to patient information, test results, and medical history."
    },
    {
      icon: <Psychology />,
      title: "AI-Powered Insights",
      description: "Advanced analytics and AI-driven insights for better patient care decisions."
    }
  ];

  const achievements = [
    {
      icon: <EmojiEvents />,
      title: "Industry Recognition",
      value: "15+",
      description: "Awards for excellence in healthcare technology innovation"
    },
    {
      icon: <WorkspacePremium />,
      title: "Certifications",
      value: "ISO 27001",
      description: "Certified for highest security standards in healthcare"
    },
    {
      icon: <Groups />,
      title: "Global Reach",
      value: "25+",
      description: "Countries using our healthcare solutions"
    },
    {
      icon: <AutoGraph />,
      title: "Growth Rate",
      value: "200%",
      description: "Year-over-year growth in user adoption"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief of Medicine, Metro Hospital",
      image: "/testimonials/sarah.jpg",
      rating: 5,
      content: "SoulSpace has revolutionized how we manage patient care. The AI-powered insights have been invaluable for making informed decisions."
    },
    {
      name: "Dr. Michael Chen",
      role: "Family Practice Physician",
      image: "/testimonials/michael.jpg",
      rating: 5,
      content: "The interface is intuitive and the patient monitoring features are exceptional. It's transformed my practice workflow."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Healthcare Administrator",
      image: "/testimonials/emily.jpg",
      rating: 5,
      content: "The security features and HIPAA compliance give us peace of mind. Best healthcare management system we've used."
    }
  ];

  return (
    <Box sx={{ 
      bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'grey.50',
      transition: 'background-color 0.3s ease',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ParticleBackground />
      
      {/* Navigation Bar */}
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.9) : alpha(theme.palette.background.paper, 0.9),
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MonitorHeart sx={{ color: theme.palette.primary.main, fontSize: 32 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              SoulSpace
            </Typography>
          </Stack>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Stack direction="row" spacing={3} alignItems="center">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    }
                  }}
                  startIcon={item.icon}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          )}

          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton 
              onClick={toggleColorMode}
              sx={{ color: theme.palette.text.primary }}
            >
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton sx={{ color: theme.palette.text.primary }}>
                  <Badge badgeContent={3} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    <Person />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      boxShadow: theme.shadows[8],
                    }
                  }}
                >
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                    <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
                    <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                    Settings
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {!isMobile && (
                  <>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => navigate('/register')}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </>
            )}

            {isMobile && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleMobileMenuToggle}
                sx={{ color: theme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: 240,
            bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.paper',
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <MonitorHeart sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              SoulSpace
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <List>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  handleMobileMenuToggle();
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            {!isAuthenticated && (
              <>
                <Divider sx={{ my: 2 }} />
                <ListItem button onClick={() => navigate('/login')}>
                  <ListItemIcon>
                    <Login />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button onClick={() => navigate('/register')}>
                  <ListItemIcon>
                    <PersonAdd />
                  </ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url("/0139-Diagnostic-AI-700x290px.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.97)} 0%, ${alpha(theme.palette.primary.main, 0.90)} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.97)} 0%, ${alpha(theme.palette.primary.light, 0.90)} 100%)`,
            zIndex: 1
          },
          minHeight: { xs: 'auto', md: '90vh' },
          py: { xs: 12, md: 0 },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <ParticleBackground />
        
        {/* Floating Elements */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, pointerEvents: 'none' }}>
          {['⚕️', '🏥', '❤️', '🔬'].map((emoji, index) => (
            <motion.div
              key={index}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: '2rem',
                opacity: 0.3,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </Box>

        <Container 
          maxWidth="lg" 
          sx={{ 
            position: 'relative',
            zIndex: 2
          }}
        >
          <Grid container spacing={{ xs: 8, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography 
                  variant="h1" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 800,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    mb: 4,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2
                  }}
                >
                  Transform Your
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ 
                      display: 'block',
                      background: 'linear-gradient(45deg, #fff, #e3f2fd)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Healthcare Practice
                  </motion.span>
                </Typography>

                {/* Quick Stats */}
                <Box sx={{ mb: 4 }}>
                  <Grid container spacing={2}>
                    {[
                      { icon: <Speed />, label: 'Faster Workflow', value: '300%' },
                      { icon: <Groups />, label: 'Happy Patients', value: '50K+' },
                      { icon: <Security />, label: 'Data Security', value: '99.9%' }
                    ].map((stat, index) => (
                      <Grid item xs={4} key={index}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 + (index * 0.2) }}
                        >
                          <Paper
                            sx={{
                              p: 1.5,
                              textAlign: 'center',
                              background: alpha(theme.palette.background.paper, 0.1),
                              backdropFilter: 'blur(10px)',
                              borderRadius: 2,
                              border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                            }}
                          >
                            {React.cloneElement(stat.icon, { sx: { fontSize: 24, mb: 1, color: 'white' } })}
                            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700 }}>
                              {stat.value}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                              {stat.label}
                            </Typography>
                          </Paper>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4,
                    opacity: 0.9,
                    maxWidth: '600px',
                    lineHeight: 1.8,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  Experience the future of medical management with our comprehensive solution. Streamline your workflow, enhance patient care, and boost efficiency.
                </Typography>

                {/* Trust Badges */}
                <Box sx={{ mb: 4 }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Trusted by:
                      </Typography>
                      {['HIPAA', 'ISO 27001', 'GDPR'].map((cert, index) => (
                        <Chip
                          key={index}
                          label={cert}
                          size="small"
                          icon={<Security sx={{ fontSize: 16 }} />}
                          sx={{
                            bgcolor: alpha(theme.palette.background.paper, 0.1),
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                            color: 'white',
                          }}
                        />
                      ))}
                    </Stack>
                  </motion.div>
                </Box>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3}
                  sx={{ 
                    mt: { xs: 4, md: 6 },
                    width: '100%'
                  }}
                >
                  {!isAuthenticated && (
                    <>
                      <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={() => navigate('/register')}
                        endIcon={<ArrowForward />}
                        sx={{
                          py: 2,
                          px: 4,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Get Started Free
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          color: 'white',
                          borderColor: 'white',
                          borderWidth: 2,
                          py: 2,
                          px: 4,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          backdropFilter: 'blur(4px)',
                          '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => navigate('/login')}
                      >
                        Login
                      </Button>
                    </>
                  )}
                  {isAuthenticated && (
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      onClick={() => navigate('/dashboard')}
                      endIcon={<ArrowForward />}
                      sx={{
                        py: 2,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                      }}
                    >
                      Go to Dashboard
                    </Button>
                  )}
                </Stack>
              </motion.div>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{
                position: 'relative',
                order: { xs: 1, md: 2 },
                mb: { xs: 4, md: 0 },
                mt: { xs: 2, md: 0 }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  maxWidth: { xs: '260px', sm: '300px', md: '100%' },
                  mx: 'auto',
                  transform: { xs: 'scale(0.9)', md: 'scale(1)' },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '50%',
                    animation: 'pulse 3s infinite',
                  },
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(0.95)',
                      opacity: 0.5,
                    },
                    '50%': {
                      transform: 'scale(1)',
                      opacity: 0.8,
                    },
                    '100%': {
                      transform: 'scale(0.95)',
                      opacity: 0.5,
                    },
                  },
                }}
              >
                <FloatingMedical />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: { xs: 8, md: 12 } }}>
        <ScrollReveal>
          <Typography 
            variant="h2" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 2
            }}
          >
            Features
          </Typography>
        </ScrollReveal>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ 
        bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : 'background.paper',
        py: { xs: 8, md: 12 }
      }}>
        <Container maxWidth="lg">
          <ScrollReveal>
            <Typography 
              variant="h2" 
              component="h2" 
              textAlign="center" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              How It Works
            </Typography>
            <Typography 
              variant="h5" 
              textAlign="center" 
              color="text.secondary"
              sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}
            >
              Get started with SoulSpace in three simple steps
            </Typography>
          </ScrollReveal>
          
          <Grid container spacing={4}>
            {[
              {
                icon: <PersonAdd sx={{ fontSize: 48 }} />,
                title: "1. Create Your Account",
                description: "Sign up in minutes with our simple onboarding process"
              },
              {
                icon: <Settings sx={{ fontSize: 48 }} />,
                title: "2. Customize Your Setup",
                description: "Configure your workspace to match your practice needs"
              },
              {
                icon: <Speed sx={{ fontSize: 48 }} />,
                title: "3. Start Managing",
                description: "Begin streamlining your healthcare practice immediately"
              }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      textAlign: 'center',
                      bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.light, 0.1),
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                      {step.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {step.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Integration Partners Section */}
      <Container maxWidth="lg" sx={{ my: { xs: 8, md: 12 } }}>
        <ScrollReveal>
          <Typography 
            variant="h2" 
            component="h2" 
            textAlign="center" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Integration Partners
          </Typography>
          <Typography 
            variant="h5" 
            textAlign="center" 
            color="text.secondary"
            sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}
          >
            Seamlessly connect with your favorite healthcare tools
          </Typography>
        </ScrollReveal>
        
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {[
            'Epic Systems',
            'Cerner',
            'Allscripts',
            'AthenaHealth',
            'NextGen',
            'eClinicalWorks'
          ].map((partner, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.light, 0.1),
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {partner}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ 
        bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : 'background.paper',
        py: { xs: 8, md: 12 }
      }}>
        <Container maxWidth="lg">
          <ScrollReveal>
            <Typography 
              variant="h2" 
              component="h2" 
              textAlign="center" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Frequently Asked Questions
            </Typography>
          </ScrollReveal>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[
              {
                question: "Is SoulSpace HIPAA compliant?",
                answer: "Yes, SoulSpace is fully HIPAA compliant and maintains the highest standards of security for patient data protection."
              },
              {
                question: "Can I integrate with my existing systems?",
                answer: "SoulSpace offers seamless integration with major healthcare systems and can be customized to work with your specific setup."
              },
              {
                question: "What support options are available?",
                answer: "We provide 24/7 technical support, comprehensive documentation, and dedicated account managers for enterprise clients."
              },
              {
                question: "How long does implementation take?",
                answer: "Basic setup can be completed in minutes. Full enterprise implementation typically takes 2-4 weeks."
              }
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.light, 0.1),
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {faq.question}
                    </Typography>
                    <Typography color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mt: { xs: 8, md: 12 }, mb: 8 }}>
        <ScrollReveal>
          <Paper
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              background: theme.palette.mode === 'dark'
                ? `linear-gradient(45deg, ${alpha(theme.palette.secondary.dark, 0.9)} 30%, ${alpha(theme.palette.secondary.main, 0.9)} 90%)`
                : `linear-gradient(45deg, ${theme.palette.secondary.light} 30%, ${theme.palette.secondary.main} 90%)`,
              color: 'white',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Ready to Transform Your Practice?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                opacity: 0.9,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Join thousands of healthcare professionals who trust SoulSpace
            </Typography>
            {!isAuthenticated && (
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: theme.palette.secondary.main,
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.9),
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/register')}
              >
                Start Your Free Trial
              </Button>
            )}
          </Paper>
        </ScrollReveal>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 6,
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.paper',
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <MonitorHeart sx={{ color: theme.palette.primary.main, fontSize: 32 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    SoulSpace
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Transforming healthcare management with innovative solutions.
                </Typography>
                <Stack direction="row" spacing={2}>
                  {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                    <IconButton
                      key={social}
                      size="small"
                      sx={{ 
                        color: theme.palette.primary.main,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }
                      }}
                    >
                      {/* Add social media icons here */}
                      {social === 'Twitter' && <Twitter />}
                      {social === 'LinkedIn' && <LinkedIn />}
                      {social === 'Facebook' && <Facebook />}
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={4}>
                {[
                  {
                    title: 'Product',
                    items: ['Features', 'Pricing', 'Security', 'Updates'],
                  },
                  {
                    title: 'Company',
                    items: ['About Us', 'Careers', 'Press', 'Contact'],
                  },
                  {
                    title: 'Resources',
                    items: ['Blog', 'Newsletter', 'Events', 'Help Center'],
                  },
                ].map((section) => (
                  <Grid item xs={12} sm={4} key={section.title}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                      {section.title}
                    </Typography>
                    <Stack spacing={1}>
                      {section.items.map((item) => (
                        <Button
                          key={item}
                          sx={{
                            justifyContent: 'flex-start',
                            color: theme.palette.text.secondary,
                            '&:hover': {
                              color: theme.palette.primary.main,
                            }
                          }}
                        >
                          {item}
                        </Button>
                      ))}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            {new Date().getFullYear()} SoulSpace. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
