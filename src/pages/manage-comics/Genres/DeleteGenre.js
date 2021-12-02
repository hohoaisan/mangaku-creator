import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { GENRES } from 'query/queryKeys';
import { deleteGenre } from 'apis/genre';

// toast
import ToastService from 'services/toast.service';

const DeleteGenre = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(deleteGenre, {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`Deleted genre ${selectedItem.name}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(GENRES);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={mutation.isLoading ? undefined : onClose} disableEscapeKeyDown>
      <DialogTitle>Delete genre</DialogTitle>
      <DialogContent>Are you sure want to delete this genre &quot;{selectedItem.name}&quot;</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={mutation.isLoading}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={mutation.isLoading}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteGenre.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default DeleteGenre;
