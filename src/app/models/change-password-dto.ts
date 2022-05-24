export class ChangePasswordDTO {
    constructor(
        public password: string,
        public passwordConfirm: string,
        public tokenPassword: string) { }
}