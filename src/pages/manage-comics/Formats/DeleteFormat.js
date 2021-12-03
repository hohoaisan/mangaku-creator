import * as React from 'react';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { FORMATS } from 'query/queryKeys';
import { deleteFormat } from 'apis/format';

// toast
import ToastService from 'services/toast.service';

const DeleteFormat = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(deleteFormat, {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`Deleted format ${selectedItem.name}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(FORMATS);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={mutation.isLoading ? undefined : onClose} disableEscapeKeyDown>
      <DialogTitle>Delete format</DialogTitle>
      <DialogContent>Are you sure want to delete this format &quot;{selectedItem.name}&quot;</DialogContent>
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

DeleteFormat.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default DeleteFormat;
