import React, { ChangeEvent, useState } from "react";
import styles from "@component/incidentsDev/ErrorDetails.module.scss";

interface CommentPropTypes {
  onChange: (value: string) => any;
}

const Comment = ({ onChange }: CommentPropTypes) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = async ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value)
    onChange(target.value)
  }

  return <div className={styles.textarea_container}>
      <textarea
        className={styles.textarea_bar}
        wrap="soft" value={comment}
        required
        onChange={handleCommentChange} />
    <label className={styles.textarea_label}>Exception comment</label>
  </div>;
}

export default Comment
