// // src/pages/PersonalTrainers.jsx
// import React, { useState, useEffect, useMemo } from 'react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
// import ProfessionalCard from '../components/ProfessionalCard';
// import { Search, SlidersHorizontal } from 'lucide-react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";

// const PersonalTrainer = () => {
//   // State for the original data and UI controls
//   const [trainers, setTrainers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Filter and search states
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedSpecialties, setSelectedSpecialties] = useState([]);
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [sortBy, setSortBy] = useState('name');
//   const [sortOrder, setSortOrder] = useState('asc');

//   // Derived state for all available specialties
//   const [allSpecialties, setAllSpecialties] = useState([]);
  
//   useEffect(() => {
//     const fetchTrainers = async () => {
//       try {
//         const trainersQuery = query(
//           collection(db, 'professionals'),
//           where('type', '==', 'trainer')
//         );
        
//         const querySnapshot = await getDocs(trainersQuery);
//         const trainersData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         // Extract all unique specialties
//         const specialties = new Set();
//         trainersData.forEach(trainer => {
//           trainer.specialties?.forEach(specialty => specialties.add(specialty));
//         });
//         setAllSpecialties(Array.from(specialties));
        
//         setTrainers(trainersData);
//       } catch (err) {
//         console.error('Error fetching trainers:', err);
//         setError('Failed to load trainers. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTrainers();
//   }, []);

//   // Filter and sort logic
//   const filteredTrainers = useMemo(() => {
//     return trainers
//       .filter(trainer => {
//         // Search filter
//         const searchMatch = searchQuery === '' || 
//           trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           trainer.bio.toLowerCase().includes(searchQuery.toLowerCase());

//         // Specialties filter
//         const specialtiesMatch = selectedSpecialties.length === 0 || 
//           selectedSpecialties.every(specialty => 
//             trainer.specialties?.includes(specialty)
//           );

//         // Days availability filter
//         const daysMatch = selectedDays.length === 0 ||
//           selectedDays.some(day => 
//             Object.keys(trainer.availability || {}).includes(day.toLowerCase())
//           );

//         return searchMatch && specialtiesMatch && daysMatch;
//       })
//       .sort((a, b) => {
//         switch (sortBy) {
//           case 'name':
//             return sortOrder === 'asc' 
//               ? a.name.localeCompare(b.name)
//               : b.name.localeCompare(a.name);
//           case 'hourlyRate':
//             return sortOrder === 'asc'
//               ? a.hourlyRate - b.hourlyRate
//               : b.hourlyRate - a.hourlyRate;
//           case 'experience':
//             return sortOrder === 'asc'
//               ? a.yearsExperience - b.yearsExperience
//               : b.yearsExperience - a.yearsExperience;
//           default:
//             return 0;
//         }
//       });
//   }, [trainers, searchQuery, selectedSpecialties, selectedDays, sortBy, sortOrder]);

//   const daysOfWeek = [
//     'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
//   ];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-red-500 text-center">
//           <p>{error}</p>
//           <Button 
//             onClick={() => window.location.reload()}
//             className="mt-4"
//           >
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Personal Trainers</h1>
//       <div className="mb-6">
//         <p className="text-gray-600">
//           Get expert guidance from our certified personal trainers. Whether you're 
//           looking to build muscle, lose weight, or improve your fitness, our trainers 
//           can help you achieve your goals.
//         </p>
//       </div>
      
//       {/* Search and Filter Controls */}
//       <div className="mb-6 space-y-4">
//         <div className="flex gap-4 items-center">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
//             <Input
//               placeholder="Search trainers..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
          
//           <Select value={sortBy} onValueChange={setSortBy}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Sort by..." />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="name">Name</SelectItem>
//               <SelectItem value="hourlyRate">Hourly Rate</SelectItem>
//               <SelectItem value="experience">Experience</SelectItem>
//             </SelectContent>
//           </Select>
          
//           <Select value={sortOrder} onValueChange={setSortOrder}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Sort order..." />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="asc">Ascending</SelectItem>
//               <SelectItem value="desc">Descending</SelectItem>
//             </SelectContent>
//           </Select>

//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <SlidersHorizontal className="h-4 w-4" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent>
//               <SheetHeader>
//                 <SheetTitle>Filter Trainers</SheetTitle>
//               </SheetHeader>
              
//               <div className="py-4">
//                 <h3 className="mb-2 font-medium">Specialties</h3>
//                 <div className="space-y-2">
//                   {allSpecialties.map(specialty => (
//                     <div key={specialty} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={specialty}
//                         checked={selectedSpecialties.includes(specialty)}
//                         onCheckedChange={(checked) => {
//                           setSelectedSpecialties(prev => 
//                             checked 
//                               ? [...prev, specialty]
//                               : prev.filter(s => s !== specialty)
//                           );
//                         }}
//                       />
//                       <label htmlFor={specialty}>{specialty}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="py-4">
//                 <h3 className="mb-2 font-medium">Available Days</h3>
//                 <div className="space-y-2">
//                   {daysOfWeek.map(day => (
//                     <div key={day} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={day}
//                         checked={selectedDays.includes(day)}
//                         onCheckedChange={(checked) => {
//                           setSelectedDays(prev => 
//                             checked 
//                               ? [...prev, day]
//                               : prev.filter(d => d !== day)
//                           );
//                         }}
//                       />
//                       <label htmlFor={day}>{day}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <Button 
//                 onClick={() => {
//                   setSelectedSpecialties([]);
//                   setSelectedDays([]);
//                 }}
//                 variant="outline"
//                 className="mt-4"
//               >
//                 Clear Filters
//               </Button>
//             </SheetContent>
//           </Sheet>
//         </div>

//         {/* Active filters display */}
//         {(selectedSpecialties.length > 0 || selectedDays.length > 0) && (
//           <div className="flex flex-wrap gap-2">
//             {selectedSpecialties.map(specialty => (
//               <span
//                 key={specialty}
//                 className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
//               >
//                 {specialty}
//                 <button
//                   onClick={() => setSelectedSpecialties(prev => 
//                     prev.filter(s => s !== specialty)
//                   )}
//                   className="hover:text-blue-600"
//                 >
//                   ×
//                 </button>
//               </span>
//             ))}
//             {selectedDays.map(day => (
//               <span
//                 key={day}
//                 className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1"
//               >
//                 {day}
//                 <button
//                   onClick={() => setSelectedDays(prev => 
//                     prev.filter(d => d !== day)
//                   )}
//                   className="hover:text-green-600"
//                 >
//                   ×
//                 </button>
//               </span>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Results count */}
//       <div className="mb-4 text-gray-600">
//         Found {filteredTrainers.length} trainers
//       </div>

//       {/* Trainers grid */}
//       {filteredTrainers.length === 0 ? (
//         <div className="text-center text-gray-500 py-8">
//           No trainers found matching your criteria.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredTrainers.map(trainer => (
//             <ProfessionalCard 
//               key={trainer.id} 
//               professional={trainer}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PersonalTrainer;

import React, { useState, useEffect, useMemo } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ProfessionalCard from '../components/ProfessionalCard';
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  IconButton,
  Button,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon, Tune as TuneIcon } from '@mui/icons-material';

const PersonalTrainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Derived state for all available specialties
  const [allSpecialties, setAllSpecialties] = useState([]);
  
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const trainersQuery = query(
          collection(db, 'professionals'),
          where('type', '==', 'trainer')
        );
        
        const querySnapshot = await getDocs(trainersQuery);
        const trainersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Extract all unique specialties
        const specialties = new Set();
        trainersData.forEach(trainer => {
          trainer.specialties?.forEach(specialty => specialties.add(specialty));
        });
        setAllSpecialties(Array.from(specialties));
        
        setTrainers(trainersData);
      } catch (err) {
        console.error('Error fetching trainers:', err);
        setError('Failed to load trainers. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const filteredTrainers = useMemo(() => {
    return trainers
      .filter(trainer => {
        const searchMatch = searchQuery === '' || 
          trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trainer.bio.toLowerCase().includes(searchQuery.toLowerCase());

        const specialtiesMatch = selectedSpecialties.length === 0 || 
          selectedSpecialties.every(specialty => 
            trainer.specialties?.includes(specialty)
          );

        const daysMatch = selectedDays.length === 0 ||
          selectedDays.some(day => 
            Object.keys(trainer.availability || {}).includes(day.toLowerCase())
          );

        return searchMatch && specialtiesMatch && daysMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return sortOrder === 'asc' 
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          case 'hourlyRate':
            return sortOrder === 'asc'
              ? a.hourlyRate - b.hourlyRate
              : b.hourlyRate - a.hourlyRate;
          case 'experience':
            return sortOrder === 'asc'
              ? a.yearsExperience - b.yearsExperience
              : b.yearsExperience - a.yearsExperience;
          default:
            return 0;
        }
      });
  }, [trainers, searchQuery, selectedSpecialties, selectedDays, sortBy, sortOrder]);

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="100vh"
      >
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Personal Trainers
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Get expert guidance from our certified personal trainers. Whether you're 
        looking to build muscle, lose weight, or improve your fitness, our trainers 
        can help you achieve your goals.
      </Typography>
      
      {/* Search and Filter Controls */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search trainers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="hourlyRate">Training Fee</MenuItem>
              <MenuItem value="experience">Experience</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Sort order</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              label="Sort order"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>

          <IconButton 
            onClick={() => setIsFilterDrawerOpen(true)}
            sx={{ border: 1, borderColor: 'divider' }}
          >
            <TuneIcon />
          </IconButton>
        </Box>

        {/* Active filters */}
        {(selectedSpecialties.length > 0 || selectedDays.length > 0) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedSpecialties.map(specialty => (
              <Chip
                key={specialty}
                label={specialty}
                onDelete={() => setSelectedSpecialties(prev => 
                  prev.filter(s => s !== specialty)
                )}
                color="primary"
                variant="outlined"
              />
            ))}
            {selectedDays.map(day => (
              <Chip
                key={day}
                label={day}
                onDelete={() => setSelectedDays(prev => 
                  prev.filter(d => d !== day)
                )}
                color="secondary"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Found {filteredTrainers.length} trainers
      </Typography>

      {/* Trainers grid */}
      {filteredTrainers.length === 0 ? (
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ py: 4 }}>
          No trainers found matching your criteria.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: 3
          }}
        >
          {filteredTrainers.map(trainer => (
            <ProfessionalCard 
              key={trainer.id} 
              professional={trainer}
            />
          ))}
        </Box>
      )}

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filter Trainers
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Specialties
            </Typography>
            <FormGroup>
              {allSpecialties.map(specialty => (
                <FormControlLabel
                  key={specialty}
                  control={
                    <Checkbox
                      checked={selectedSpecialties.includes(specialty)}
                      onChange={(e) => {
                        setSelectedSpecialties(prev => 
                          e.target.checked
                            ? [...prev, specialty]
                            : prev.filter(s => s !== specialty)
                        );
                      }}
                    />
                  }
                  label={specialty}
                />
              ))}
            </FormGroup>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Available Days
            </Typography>
            <FormGroup>
              {daysOfWeek.map(day => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={selectedDays.includes(day)}
                      onChange={(e) => {
                        setSelectedDays(prev => 
                          e.target.checked
                            ? [...prev, day]
                            : prev.filter(d => d !== day)
                        );
                      }}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setSelectedSpecialties([]);
              setSelectedDays([]);
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
};

export default PersonalTrainer;