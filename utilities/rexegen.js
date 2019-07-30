/**
 *
 *
 * @export
 * @class rexegen
 */
/**
   *
   * Email regex pattern
   * @static
   * @memberof rexegen
   */
  export const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3})+$/;
  /**
     *
     * Number regex pattern
     * @static
     * @memberof rexegen
     */
  export const numberRegex = /^\d$/;
  /**
     *
     * Password regex pattern
     * @static
     * @memberof rexegen
     */
  export const passwordRegex = /^.{6,}$/;
  /**
     *
     * Description regex pattern
     * @static
     * @memberof rexegen
     */
  export const descriptionRegex = /[a-zA-Z .]{20,}/;
  