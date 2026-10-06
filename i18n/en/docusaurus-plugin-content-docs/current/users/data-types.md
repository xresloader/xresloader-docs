---
title: Data types
description: Data types supported during conversion
---

# Data types {#数据类型说明}

## Arrays, repeated fields and structures {#数组repeated和数据结构}

Spreadsheets often leave cells unset. By default, removed cells (rather than cells containing an explicit empty value) do not produce array elements, so arrays have dynamic length and omit absent entries. Unset optional fields likewise do not produce values in the binary structure.

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| col\[0\] | col\[1\] | col\[2\] |
| 123 | | 456 |

The exported `col` has two elements: `col[0]=123, col[1]=456`.

## Fixed-length arrays {#定长数组}

When array positions carry meaning, retain missing positions:

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| row\[0\] | row\[1\] | row\[2\] |
| 123 | | 456 |

Use `--list-keep-empty` to export the default value for the missing cell. The result has three elements: `row[0]=123, row[1]=0, row[2]=456`.

## Unsigned integers {#无符号整数}

Some languages, including Java, represent protobuf unsigned values with signed integer types. Keep Excel input within the converter's signed range to avoid truncation. The converter uses Java Long for integers; even a uint64 field cannot accept input beyond the int64 range.

## Dates and times {#日期和时间类型}

With explicit `--enable-excel-formular`, date-formatted cells follow date/time conversion rules. Default streaming mode does not detect date formats.

POI identifies date/time cells by their format. Prefer a format such as `yyyy-MM-dd HH:mm:ss`.

Excel serial dates depend on the workbook's 1900 / 1904 date system. A time-only cell such as `10:11:12` also carries that system's base date. The converter assumes absolute dates are after 1970: for a date whose year is **1970 or earlier**, it uses only the hours, minutes and seconds. Thus `10:11:12` becomes `10*3600+11*60+12=36672`.

For a string field, a format containing `-` produces the date as `yyyy-MM-dd`; a format containing `:` produces time as `HH:mm:ss`. A format containing both produces `yyyy-MM-dd HH:mm:ss`.

## Duration units {#duration-单位}

From 2.23.0, google.protobuf.Duration text supports w/weeks, d/days, h/hours, m/minutes, s/seconds, ms/milliseconds, us/microseconds and ns/nanoseconds. These units apply to Duration parsing; they do not give ordinary integers time semantics.

For example, `2h` means 7200 seconds; `500ms` means 0 seconds and 500000000 nanoseconds. Absolute instants use google.protobuf.Timestamp; Duration is not a date/time.

If you depend on Excel date formatting, explicitly enable evaluation and verify actual values. Textual times and durations are easier to check across machines.
