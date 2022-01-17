const strings = {
  title: 'Managaku',
  common: {
    approvalStatus: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    tabs: {
      default: 'Default',
      deleted: 'Deleted',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected'
    },
    columns: {
      name: 'Name',
      description: 'Description',
      authorUser: 'Author user',
      approvalStatus: 'Approval status',
      restricted: 'Restricted',
      createdAt: 'Created At',
      deletedAt: 'Deleted At',
      updatedAt: 'Last modified',
      uniqueKey: 'Unique key'
    }
  },
  toast: {
    signedin: 'Logged in',
    expireSignOut: 'Token expired, logged out',
    signOut: 'Logged out'
  },
  menus: {
    people: 'People',
    manageUsers: 'Manage Users',
    comic: 'Manage Comics',
    manageComic: 'Comics',
    manageAuthor: 'Authors',
    manageFormat: 'Formats',
    manageGenre: 'Genres'
  },

  entities: {
    comic: {
      views: 'Views',
      ratings: 'Ratings',
      favorites: 'Favorites',
      approval: 'Approval',
      authors: 'Authors',
      formats: 'Formats',
      genres: 'Genres',
      description: 'Description',
      chapters: 'Chapters',
      noChap: 'No chapter',
      deletedAt: 'Deleted at',
      createdAt: 'Created at',
      updatedAt: 'Updated at'
    },
    chapter: {
      number: 'Chapter',
      volume: 'Volume',
      name: 'Chapter name',
      numPages: 'Pages'
    },
    user: {
      name: 'Name',
      role: 'Role',
      email: 'Email',
      password: 'Password',
      emailVerified: 'Email verified',
      restrict: 'Restrict',
      banned: 'Banned',
      verified: 'Verified',
      notVerified: 'Not Verified'
    }
  },

  buttons: {
    signin: 'Sign in',
    register: 'Procceed to register',
    signout: 'Logout',
    close: 'Close',
    create: 'Create',
    cancel: 'Cancel',
    confirm: 'Confirm',
    update: 'Update',
    uploadNewChapter: 'Upload new chapter',
    upload: 'Upload'
  },
  errors: {
    unknown: 'Unknow error',
    network: 'Network error',
    server: 'Server error'
  },
  roles: {
    ADMIN: 'Administrator',
    MOD: 'Moderator',
    AUTHOR: 'Author',
    USER: 'User'
  },
  forms: {
    labels: {
      email: 'Email',
      name: 'Name',
      password: 'Password',
      authorName: 'Author name',
      authorDescription: 'Author Description',
      restrict: 'Restrict',
      approvalStatus: 'Approval status',
      key: 'Unique Key',
      description: 'Description',
      title: 'Title',
      author: 'Author',
      genre: 'Genres',
      format: 'Formats',
      covers: 'Covers',
      approval: 'Approval Status',
      chapNumber: 'Number',
      volume: 'Volume',
      pages: 'Pages'
    },
    validations: {
      emailValid: 'Must be a valid email',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      nameRequired: 'Name is required',
      descriptionRequired: 'Description is required',
      keyRequired: 'Key is required',
      titleRequired: 'Title is required',
      authorRequired: 'Author is required',
      genreRequired: 'Genre is required',
      formatRequired: 'Format is required',
      coverImageRequired: 'Cover image is required',
      defaultCoverRequired: 'A default cover is required',
      chapNumberRequired: 'Chapter number is required',
      chapPagesRequired: 'Chapter pages is required'
    }
  },
  pages: {
    auth: {
      singinWithEmail: 'Sign in with Email address',
      greet1: 'Hi, Welcome Back',
      greet2: ' Enter your credentials to continue',
      noAccount: 'Don&apos;t have an account?',
      becomeAuthor: 'Become an author',
      pendingAuthor: 'You have registered to become an author, but was not approved yet, please wait',
      acceptedAuthor: 'You have become an author!, Please logout and login again!',
      rejectedAuthor: 'Your request to become an author was rejected'
    },
    author: {
      manage: 'Manage Authors',
      create: 'Create Author',
      delete: 'Delete Author',
      update: 'Update Author',
      restore: 'Restore Author',
      mutations: {
        createSuccess: 'Author created',
        deleteSuccess: 'Deleted author',
        updateSuccess: 'Updated author',
        restoreSuccess: 'Restored author',
        restoreFailed: 'Unable to restore author'
      },
      prompt: {
        deleteAuthor: 'Are you sure want to delete this author',
        restoreAuthor: 'Are you sure want to restore this author'
      }
    },
    genre: {
      manage: 'Manage Genres',
      create: 'Create Genre',
      delete: 'Delete Genre',
      update: 'Update Genre',
      mutations: {
        createSuccess: 'Genre created',
        deleteSuccess: 'Deleted genre',
        updateSuccess: 'Updated genre'
      },
      prompt: {
        deleteAuthor: 'Are you sure want to delete this genre'
      }
    },
    format: {
      manage: 'Manage Formats',
      create: 'Create Format',
      delete: 'Delete Format',
      update: 'Update Format',
      mutations: {
        createSuccess: 'Format created',
        deleteSuccess: 'Deleted format',
        updateSuccess: 'Updated format'
      },
      prompt: {
        deleteFormat: 'Are you sure want to delete this format'
      }
    },
    comic: {
      mangage: 'Manage Comics',
      detail: 'Comic $title',
      create: 'Add new comic',
      delete: 'Delete Comic',
      restore: 'Restore Comic',
      update: 'Update Comic',
      mutations: {
        createSuccess: 'Comic created',
        deleteSuccess: 'Deleted comic',
        updateSuccess: 'Updated comic',
        restoreSuccess: 'Restored comic',
        restoreFailed: 'Unable to restore comic'
      },
      prompt: {
        deleteComic: 'Are you sure want to delete this comic',
        restoreComic: 'Are you sure want to restore this comic'
      }
    },
    chapter: {
      upload: 'Upload chapter',
      update: 'Update chapter',
      restore: 'Restore chapter',
      delete: 'Delete chapter',
      mutations: {
        uploadSuccess: 'Chapter uploaded',
        updateSuccess: 'Chapter uploaded',
        restoreFailed: 'Unable to restore chapter',
        restoreSuccess: 'Restored chapter',
        deleteSuccess: 'Deleted chapter'
      },
      prompt: {
        restoreChapter: 'Are you sure want to restore this chapter',
        deleteChapter: 'Are you sure want to delete this chapter'
      }
    },
    user: {
      manage: 'Manage users',
      create: 'Create user',
      delete: 'Delete user',
      restore: 'Restore user',
      mutations: {
        createSuccess: 'User created',
        deleteSuccess: 'Deleted user',
        deleteFailed: 'Unable to delete user',
        updateSuccess: 'User updated',
        restoreSuccess: 'Restored user',
        restoreFailed: 'Unable to restore user'
      },
      prompt: {
        deleteUser: 'Are you sure want to delete this user',
        restoreUser: 'Are you sure want to restore this user'
      }
    }
  }
};

export default strings;
