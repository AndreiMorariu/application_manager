import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { TextField, InputLabel, MenuItem, Select } from "@mui/material";

import toast, { Toaster } from "react-hot-toast";

import { insertApplication } from "../services/apiApplications";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #D3D3D3",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

const formatDate = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return [year, month, day].join("-");
};

const applicationStatuses = [
  "Applied",
  "In Review",
  "Interview Scheduled",
  "Assessment",
  "Follow-Up",
  "Offer Extended",
  "Offer Accepted",
  "Offer Declined",
  "Rejected",
  "Withdrawn",
  "On Hold",
  "Hired",
];

function CreateModal({ onClose }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "",
    application_date: formatDate(new Date()),
    location: "",
    link: "",
  });

  const [open, setOpen] = useState(true);
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const editPostMutation = useMutation({
    mutationFn: () => insertApplication(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      toast.success("Application created");
    },
    onError: () => {
      toast.success("Could not create the application");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    editPostMutation.mutate();
    handleClose();
  };

  return (
    <Box>
      <Toaster position="top-center" reverseOrder={false} />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} component="form" onSubmit={handleSubmit}>
            <Box marginBottom="1rem">
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                marginBottom="1rem"
              >
                Create application
              </Typography>
              <TextField
                fullWidth
                required
                type="text"
                id="company"
                label="company"
                variant="outlined"
                autoComplete="off"
                value={formData.company}
                onChange={(e) => {
                  setFormData({ ...formData, company: e.target.value });
                }}
              />
            </Box>
            <Box marginBottom="1rem">
              <TextField
                fullWidth
                required
                type="text"
                id="position"
                label="position"
                variant="outlined"
                autoComplete="off"
                value={formData.position}
                onChange={(e) => {
                  setFormData({ ...formData, position: e.target.value });
                }}
              />
            </Box>
            <Box marginBottom="1rem">
              <TextField
                fullWidth
                required
                type="text"
                id="location"
                label="Location"
                variant="outlined"
                autoComplete="off"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                }}
              />
            </Box>
            <Box marginBottom="1rem">
              <TextField
                fullWidth
                required
                type="text"
                id="link"
                label="link"
                variant="outlined"
                autoComplete="off"
                value={formData.link}
                onChange={(e) => {
                  setFormData({ ...formData, link: e.target.value });
                }}
              />
            </Box>
            <Box marginBottom="1rem">
              <TextField
                fullWidth
                required
                type="date"
                id="date"
                label="application date"
                variant="outlined"
                autoComplete="off"
                value={formData.application_date}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    application_date: e.target.value,
                  });
                }}
              />
            </Box>
            <Box marginBottom="1rem">
              <InputLabel>Status</InputLabel>
              <Select
                required
                value={formData.status}
                onChange={(e) => {
                  setFormData({ ...formData, status: e.target.value });
                }}
                fullWidth
              >
                {applicationStatuses.map((status, i) => (
                  <MenuItem key={i} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Button
              variant="contained"
              sx={{ marginLeft: "auto", display: "block" }}
              type="submit"
            >
              Create
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default CreateModal;
