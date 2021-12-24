import * as React from 'react';
import PropsType from 'prop-types';
import { useParams } from 'react-router-dom';
// material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// react query
import { useMutation } from 'react-query';
import queryClient from 'query';
import { CHAPTERS } from 'query/queryKeys';
import { deleteComicChapter } from 'apis/chapter';

// toast
import ToastService from 'services/toast.service';

const DeleteChapter = ({ open, onClose, selectedItem }) => {
  const { comicId } = useParams();
  const mutation = useMutation((chapterId) => deleteComicChapter(comicId, chapterId), {
    onMutate: async () => {},
    onSuccess: async () => {
      ToastService.destroyAll();
      ToastService.success(`Deleted chapter ${selectedItem.name}`);
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
      <DialogTitle>Delete Chapter</DialogTitle>
      <DialogContent>
        Are you sure want to delete this chapter {selectedItem.number} - &quot;{selectedItem.name}&quot;
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

DeleteChapter.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  selectedItem: PropsType.object
};

export default DeleteChapter;
