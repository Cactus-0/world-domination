declare type Switch<Boolean extends boolean, A, B> =
    Boolean extends true
        ? A
        : B
