import FatalError from './FatalError'
import { TypeCounter, ArrayStringType, ArrayNumberType } from './types'

export function is_array(n: any): boolean {
  return Array.isArray(n)
}

export function is_string(n: any): boolean {
  return typeof n === 'string'
}

export function is_int(n: number): boolean {
  return n % 1 === 0
}

export function is_float(n: number): boolean {
  return Number(n) === n && n % 1 !== 0
}

export function is_null(n: any): boolean {
  return n === null
}

/** only js */
export function is_undefined(n: any): boolean {
  return typeof n === 'undefined'
}

export function is_callable(n: any): boolean {
  return typeof (n) === 'function'
}

export function array_unique(n: any[]): any[] {
  return [...new Set(n)];
}

/**
 * @link https://www.php.net/manual/en/function.date
 */
export function date(format: string): string {
  const dater: Date = new Date()
  const splitted: string[] = format.split('')

  let result: string[] = []

  splitted.forEach(char => {
    let value: string = ''

    switch (char) {
      case 'Y':
        value = dater.getFullYear().toString()
        break
      case 'y':
        value = dater.getFullYear().toString().slice(-2)
        break
      case 'm':
        value = `0${dater.getMonth() + 1}`.slice(-2)
        break
      case 'd':
        value = `0${dater.getDate()}`.slice(-2)
        break
      case 'H':
        value = `0${dater.getHours()}`.slice(-2)
        break
      case 'i':
        value = `0${dater.getMinutes()}`.slice(-2)
        break
      case 's':
        value = `0${dater.getSeconds()}`.slice(-2)
        break
      default:
        value = char
    }

    result.push(value)
  })

  return result.join('')
}

/**
 * @Link https://www.php.net/manual/en/function.time.php
 */
export function time(): number {
  return Math.floor(Date.now() / 1000)
}

/**
 * sleep
 * @param seconds
 * @returns
 */
export function sleep(seconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

/**
 * TODO digits
 * `s`: string
 * `d`: integer
 * TODO `f`: float
 * TODO `x`: hex
 */
const REG_SPECIFIER: RegExp = /%(?<digits>[\d\.]+?)?(?<type>s|d)/

/**
 * TODO implements
 * @link https://www.php.net/manual/en/function.sprintf.php
 */
export function sprintf(format: string, ...args: any[]): string {
  // check Specifier
  if (REG_SPECIFIER.test(format) === false) {
    return format
  }

  let captured: any
  let loop: number = 0

  while (captured = REG_SPECIFIER.exec(format)) {
    let replace: any = loop < args.length ? args[loop] : ''
    const length = captured.length

    switch (captured[0]) {
      case '%s':
        format = substr_replace(format, String(replace), captured.index, length)
        break
      case '%d':
        format = substr_replace(format, Number(replace).toString(), captured.index, length)
        break
      default:
    }

    loop += 1
  }

  return format
}

/**
 * @link https://www.php.net/manual/en/function.str-replace.php
 **/
export function str_replace(
  search: ArrayStringType | string,
  replace: ArrayStringType | string,
  subject: ArrayStringType | string,
  count: TypeCounter | null = null,
): ArrayStringType | string {
  if (typeof search !== typeof replace) {
    throw new FatalError('Argument #2 (replace) must be of type string when argument #1 (search) is a string')
  }

  const returnArray = is_array(subject)

  if (!is_array(search)) {
    search = [search as string]
  }

  if (!is_array(replace)) {
    replace = [replace as string]
  }

  if (!is_array(subject)) {
    subject = [subject as string]
  }


  let passed: number = 0 // If passed, this will be set to the number of replacements performed.

  for (let indexSubject in subject as ArrayStringType) {
    let result = subject[indexSubject]

    for (let indexSearch in search as ArrayStringType) {
      result = result.replace(search[indexSearch], replace[indexSearch])
      passed += 1
    }

    (subject as ArrayStringType)[indexSubject] = result
  }

  if (!is_null(count)) {
    (count as TypeCounter).count = passed
  }

  return returnArray ? subject : subject[0]
}

export function substr_replace(
  string: string,
  replace: string,
  offset: number,
  length: number | null = null,
): string
{
  return string.substr(0, offset)
        + replace
        + string.substr(
            offset + ((length != null ? length : replace.length) - 1)
          )
}
