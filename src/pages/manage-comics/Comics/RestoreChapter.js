import * as React from 'react';
import { useParams } from 'react-router-dom';
import PropsType from 'prop-types';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { CHAPTERS } from 'query/queryKeys';
import { restoreChapter } from 'apis/chapter';

// toast
import ToastService from 'services/toast.service';
import getAPIErrorMessage from 'utils/getAPIErrorMessage';

const RestoreChapter = ({ open, onClose, selectedItem }) => {
  const { comicId } = useParams();
  const mutation = useMutation((chapterId) => restoreChapter(comicId, chapterId), {
    onMutate: async () => {},
    onError: async (err) => {
      ToastService.destroyAll();
      const message = getAPIErrorMessage(err);
      ToastService.error(`Unable to restore chapter ${selectedItem.name}, reason: ${message}`);
    },
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`Restored chapter ${selectedItem.name}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(CHAPTERS);
      onClose();
    }
  });
  const onSubmit = () => {
    mutation.mutate(selectedItem.id);
  };
  return (
    <Dialog open={open} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>Restore Chapter</DialogTitle>
      <DialogContent>
        Are you sure want to restore this chapter {selectedItem.number} - &quot;{selectedItem.name}&quot;
      </DialogContent>
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

RestoreChapter.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default RestoreChapter;
