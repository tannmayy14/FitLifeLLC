    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    Chip,
    CircularProgress
    } from '@mui/material';
    import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
    import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
    import { format } from 'date-fns'; // Add this import at the top
    import { toast } from 'react-toastify';
    import { ToastContainer } from 'react-toastify';
    import { sendAppointmentConfirmation } from '../services/notificationServices'; // Adjust the path based on your project structure
    import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Import necessary Firestore functions
    import { db, auth } from '../firebaseConfig'; // Adjust the import based on your Firebase configuration


    
    const ProfessionalCard = ({ professional }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const getAvailableTimesForDate = (date) => {
        if (!date) return [];
        
        const dayOfWeek = format(date, 'EEEE').toLowerCase(); // This will give us the day name in lowercase
        return professional.availability[dayOfWeek]?.slots || [];
      };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime) return; // Validate selection
        setIsLoading(true);
      
        try {
          const professionalRef = doc(db, 'professionals', professional.id); // Reference to professional document
          const professionalDoc = await getDoc(professionalRef); // Fetch the professional document
          const professionalData = professionalDoc.data(); // Get data from the document
      
          // Get available times for the selected day
          const availableTimes = getAvailableTimesForDate(selectedDate);
      
          // Check if the selected time is available
          if (!availableTimes.includes(selectedTime)) {
            toast.error('Selected time is not available.'); // Show error toast
            return;
          }
      
          // Create new booking
          const newBooking = {
            date: selectedDate,
            time: selectedTime,
            clientId: auth.currentUser.uid, // Get the logged-in user's ID
          };
      
          // Update the bookedSlots array in Firestore
          await updateDoc(professionalRef, {
            bookedSlots: [...professionalData.bookedSlots, newBooking],
          });
      
          setIsBookingOpen(false); // Close the booking modal or UI element
          toast.success('Booking successful!'); // Show success toast
      
          // Redirect the user back to the same page
          await new Promise((resolve) => setTimeout(resolve, 4000));
          navigate(0); // Reload the current page
        } catch (error) {
          toast.error('Error booking appointment. Please try again.'); // Show error toast
          console.error('Error booking appointment:', error); // Log error for debugging
        } finally {
          setIsLoading(false); // Reset loading state
        }
      };

    return (
        <>
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            title={
            <div>
                <img
                src={professional.photoUrl}
                alt={professional.name}
                style={{
                    width: '100%',
                    height: 192,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginBottom: 2
                }}
                />
                <Typography variant="h6" component="div">
                {professional.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {professional.type}
                </Typography>
            </div>
            }
        />
        
        <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {professional.bio}
            </Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {professional.specialties.map(specialty => (
                <Chip
                key={specialty}
                label={specialty}
                size="small"
                color="primary"
                variant="outlined"
                />
            ))}
            </div>
        </CardContent>

        <CardActions>
            <Button 
            variant="contained"
            fullWidth
            onClick={() => setIsBookingOpen(true)}
            >
            Schedule Consultation
            </Button>
        </CardActions>

        <Dialog
            open={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
            Schedule with {professional.name}
            </DialogTitle>
            <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
                Choose a date and time for your consultation
            </DialogContentText>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                value={selectedDate}
                onChange={(newDate) => setSelectedDate(newDate)}
                sx={{ width: '100%', mb: 2 }}
                />
            </LocalizationProvider>

            {selectedDate && (
                <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: 8,
                marginBottom: 16 
                }}>
                {getAvailableTimesForDate(selectedDate).map(time => (
                    <Button
                    key={time}
                    variant={selectedTime === time ? "contained" : "outlined"}
                    onClick={() => setSelectedTime(time)}
                    size="small"
                    >
                    {time}
                    </Button>
                ))}
                </div>
            )}
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setIsBookingOpen(false)}>Cancel</Button>
            <Button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime || isLoading}
                variant="contained"
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
                {isLoading ? "Scheduling..." : "Confirm Booking"}
            </Button>
            </DialogActions>
        </Dialog>
        <ToastContainer />
        </Card>
        </>
    );
    };

    export default ProfessionalCard;