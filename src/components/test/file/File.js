import React from "react";
import FileList from "./FileList";
import UploadFile from "./UploadFile";
import FileViewer from "./FileViewer";
import DeleteFile from "./DeleteFile";
import AllFiles from "./AllFiles"; // Hiển thị toàn bộ file
import FilesByUser from "./FilesByUser"; // Lấy danh sách file theo user
import UpdateFile from "./UpdateFile"; // Cập nhật thông tin file
import FilesByProduct from "./FilesByProduct";
import FilesByReview from "./FilesByReview";
import MigrateFile from "./MigrateFile";


const File = () => {
  const userId = 1; // Dùng làm ví dụ cho FilesByUser
  const fileId = 1; // Dùng làm ví dụ cho FileDetail và UpdateFile

  return (
    <div>
      <section>
        <MigrateFile />
      </section>
      <section>
        <AllFiles />
      </section>

      <section>
        <FileList page={1} limit={10} />
      </section>

      <section>
        <UploadFile />
      </section>

      <section>
       < FileViewer />
      </section>

      <section>
        <UpdateFile fileId={fileId} />
      </section>

      <section>
        <DeleteFile fileId={fileId} />
      </section>

      <section>
        <FilesByUser userId={userId} />
      </section>

      <section>
        <FilesByProduct />
      </section>

      <section>
        <FilesByReview />
      </section>

    </div>
  );
};

export default File;
