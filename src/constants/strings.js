const strings = {
  title: 'Managaku',
  common: {
    approvalStatus: {
      pending: 'Chờ duyệt',
      approved: 'Đã duyệt',
      rejected: 'Đã từ chối'
    },
    tabs: {
      default: 'Mặc định',
      deleted: 'Đã xoá',
      pending: 'Chờ duyệt',
      approved: 'Đã duyệt',
      rejected: 'Đã từ chối',
      authorUser: 'Người dùng tác giả'
    },
    columns: {
      name: 'Tên',
      description: 'Mô tả',
      authorUser: 'Tác giả',
      approvalStatus: 'Tình trạng duyệt',
      restricted: 'Giới hạn',
      createdAt: 'Thời điểm tạo',
      deletedAt: 'Thời điểm xoá',
      updatedAt: 'Thời điểm cập nhật',
      uniqueKey: 'Key duy nhất'
    }
  },
  toast: {
    signedin: 'Đã đăng nhập',
    expireSignOut: 'Token hết hạn, đăng xuất',
    signOut: 'Đã đăng xuất'
  },
  menus: {
    people: 'Người dùng',
    manageUsers: 'Quản lí người dùng',
    comic: 'Quản lí truyện',
    manageComic: 'Truyện',
    manageAuthor: 'Tác giả',
    manageFormat: 'Định dạng',
    manageGenre: 'Thể loại'
  },

  entities: {
    comic: {
      views: 'Lượt xem',
      ratings: 'Đánh giá',
      favorites: 'Lượt yêu thích',
      approval: 'Tình trạng duyệt',
      authors: 'Tác giả',
      formats: 'Định dạng',
      genres: 'Thể loại',
      description: 'Mô tả',
      chapters: 'Chương truyện',
      noChap: 'Không có chương nào',
      createdAt: 'Thời điểm tạo',
      deletedAt: 'Thời điểm xoá',
      updatedAt: 'Thời điểm cập nhật'
    },
    chapter: {
      number: 'Chương số',
      volume: 'Tập (Volume)',
      name: 'Tên chương',
      numPages: 'Số trang'
    },
    user: {
      name: 'Tên',
      role: 'Vai trò',
      email: 'Email',
      password: 'Mật khẩu',
      emailVerified: 'Email đã xác thực',
      restrict: 'Giới hạn',
      banned: 'Bị Ban',
      verified: 'Đã xác thực',
      notVerified: 'Chưa xác thực'
    }
  },

  buttons: {
    signin: 'Đăng nhập',
    register: 'Tiến hành đăng kí',
    signout: 'Đăng xuất',
    close: 'Đóng',
    create: 'Tạo mới',
    cancel: 'Huỷ bỏ',
    confirm: 'Xác nhận',
    update: 'Cập nhật',
    uploadNewChapter: 'Tải lên chương mới',
    upload: 'Tải lên'
  },
  errors: {
    unknown: 'Lỗi không xác định',
    network: 'Lỗi mạng',
    server: 'Lỗi máy chủ'
  },
  roles: {
    ADMIN: 'Quản trị viên',
    MOD: 'Biên tập viên',
    AUTHOR: 'Tác giả',
    USER: 'Người dùng'
  },
  forms: {
    labels: {
      email: 'Email',
      name: 'Tên',
      password: 'Mật khẩu',
      authorName: 'Tên tác giả',
      authorDescription: 'Mô tả tác giả',
      restrict: 'Giới hạn',
      approvalStatus: 'Tình trạng duyệt',
      key: 'Key duy nhất',
      description: 'Mô tả',
      title: 'Tiêu đề',
      author: 'Tác giả',
      genre: 'Thể loại',
      format: 'Định dạng',
      covers: 'Ảnh bìa',
      approval: 'Tình trạng duyệt',
      chapNumber: 'Chương số',
      volume: 'Tập (Volume)',
      pages: 'Trang'
    },
    validations: {
      emailValid: 'Phải là email hợp lệ',
      emailRequired: 'Phải nhập email',
      passwordRequired: 'Phải nhập mật khẩu',
      nameRequired: 'Phải nhập tên',
      descriptionRequired: 'Phải nhập mô tả',
      keyRequired: 'Phải nhập Key',
      titleRequired: 'Phải nhập tiêu đề',
      authorRequired: 'Phải chọn tác giả',
      genreRequired: 'Phải chọn thể loại',
      formatRequired: 'Phải chọn định dạng',
      coverImageRequired: 'Phải có ảnh bìa',
      defaultCoverRequired: 'Phải có ảnh bìa mặc định',
      chapNumberRequired: 'Phải nhập số của chương',
      chapPagesRequired: 'Phải tải lên trang của chương'
    }
  },
  pages: {
    auth: {
      singinWithEmail: 'Đăng nhập với email và mật khẩu',
      greet1: 'Chào mừng trở lại',
      greet2: 'Vui lòng nhập thông tin đăng nhập để tiếp tục',
      noAccount: 'Chưa có tài khoản',
      becomeAuthor: 'Trở thành tác giả',
      pendingAuthor: 'Bạn đã đăng kí trở thành tác giả, nhưng chưa được duyệt, hãy chờ',
      acceptedAuthor: 'Bạn đã trở thành tác giả, vui lòng đăng xuất và đăng nhập lại',
      rejectedAuthor: 'Yêu cầu trở thành tác giả đã bị từ chối'
    },
    author: {
      manage: 'Quản lí tác giả',
      create: 'Thêm tác giả',
      delete: 'Xoá tác giả',
      update: 'Cập nhật tác giả',
      restore: 'Khôi phục tác giả',
      mutations: {
        createSuccess: 'Đã thêm tác giả',
        deleteSuccess: 'Đã xoá tác giả',
        updateSuccess: 'Đã cập nhật tác giả',
        restoreSuccess: 'Đã khôi phục tác giả',
        restoreFailed: 'Không thể khôi phục tác giả'
      },
      prompt: {
        deleteAuthor: 'Bạn có chắc chắn muốn xoá tác giả này không',
        restoreAuthor: 'Bạn có chắc chắn muốn khôi phục tác giả này không'
      }
    },
    genre: {
      manage: 'Quản lí thể loại',
      create: 'Tạo thể loại',
      delete: 'Xoá thể loại',
      update: 'Cập nhật thể loại',
      mutations: {
        createSuccess: 'Đã tạo thể loại',
        deleteSuccess: 'Đã xoá thể loại',
        updateSuccess: 'Đã cập nhật thể loại'
      },
      prompt: {
        deleteAuthor: 'Bạn có chắc chắn muốn xoá thể loại này không'
      }
    },
    format: {
      manage: 'Quản lí định dạng',
      create: 'Tạo định dạng',
      delete: 'Xoá định dạng',
      update: 'Cập nhật định dạng',
      mutations: {
        createSuccess: 'Đã tạo định dạng',
        deleteSuccess: 'Đã xoá định dạng',
        updateSuccess: 'Đã cập nhật định dạng'
      },
      prompt: {
        deleteFormat: 'Bạn có chắc chắn muốn xoá định dạng này không'
      }
    },
    comic: {
      mangage: 'Quản lí truyện',
      detail: 'Truyện $title',
      create: 'Thêm truyện mới',
      delete: 'Xoá truyện',
      restore: 'Khôi phục truyện',
      update: 'Cập nhật truyện',
      mutations: {
        createSuccess: 'Truyện đã được thêm',
        deleteSuccess: 'Đã xoá truyện',
        updateSuccess: 'Đã cập nhật truyện',
        restoreSuccess: 'Đã khôi phục truyện',
        restoreFailed: 'Chưa thể khôi phục truyện'
      },
      prompt: {
        deleteComic: 'Bạn có chắc chắn muốn xoá truyện này không',
        restoreComic: 'Bạn có chắc chắn muốn khôi phục truyện này không'
      }
    },
    chapter: {
      upload: 'Tải chương truyện',
      update: 'Cập nhật chương truyện',
      restore: 'Khôi phục chương truyện',
      delete: 'Xoá chương truyện',
      mutations: {
        uploadSuccess: 'Đã tải lên chương truyện',
        updateSuccess: 'Đã cập nhật chương truyện',
        restoreFailed: 'Có lỗi khi khôi phục chương truyện',
        restoreSuccess: 'Đã khôi phục chương truyện',
        deleteSuccess: 'Đã xoá chương truyện'
      },
      prompt: {
        restoreChapter: 'Bạn có chắc chắn muốn khôi phục chương truyện này không',
        deleteChapter: 'Bạn có chắc chắn muốn xoá chương truyện này không'
      }
    },
    user: {
      manage: 'Quản lí người dùng',
      create: 'Thêm người dùng',
      delete: 'Xoá người dùng',
      restore: 'Khôi phục người dùng',
      mutations: {
        createSuccess: 'Đã tạo mới người dùng',
        deleteSuccess: 'Đã xoá người dùng',
        deleteFailed: 'Không thể xoá người dùng',
        updateSuccess: 'Đã cập nhật người dùng',
        restoreSuccess: 'Đã khôi phục người dùng',
        restoreFailed: 'Không thể khôi phục người dùng'
      },
      prompt: {
        deleteUser: 'Bạn có chắc chắn muốn xoá người dùng này không',
        restoreUser: 'Bạn có chắc chắn muốn khôi phục người dùng này không'
      }
    }
  }
};

export default strings;
