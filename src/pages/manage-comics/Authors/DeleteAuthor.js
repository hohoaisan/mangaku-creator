import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { AUTHORS } from 'query/queryKeys';
import { deleteAuthor } from 'apis/author';

// toast
import ToastService from 'services/toast.service';

const DeleteAuthor = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(deleteAuthor, {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`Deleted author ${selectedItem.name}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(AUTHORS);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>Delete Author</DialogTitle>
      <DialogContent>Are you sure want to delete this author &quot;{selectedItem.name}&quot;</DialogContent>
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

DeleteAuthor.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default DeleteAuthor;
