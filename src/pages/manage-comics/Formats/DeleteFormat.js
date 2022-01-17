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
import strings from 'constants/strings';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

const {
  buttons,
  pages: { format: formatPageStrings }
} = strings;

const DeleteFormat = ({ open, onClose, selectedItem }) => {
  const mutation = useMutation(deleteFormat, {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`${formatPageStrings.mutations.deleteSuccess} ${selectedItem.name}`);
    },
    onError: (err) => {
      const message = getAPIErrorMessage(err);
      ToastService.error(message);
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
      <DialogTitle>{formatPageStrings.delete}</DialogTitle>
      <DialogContent>
        {formatPageStrings.prompt.deleteFormat} &quot;{selectedItem.name}&quot;
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={mutation.isLoading}>
          {buttons.close}
        </Button>
        <Button onClick={onSubmit} disabled={mutation.isLoading}>
          {buttons.confirm}
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
