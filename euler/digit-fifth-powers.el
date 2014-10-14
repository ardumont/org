;;; digit-fifth-powers.el --- Compute the sum of numbers to which their digits elevated to some exponent is themselves.
;;; Commentary:
;;; Code:

(require 'dash)

(defun number-to-digits (n)
  "Compute the number N into its digit as list."
  (mapcar (lambda (x) (- x ?0)) (number-to-string n)))

(defun sum-of-digits-elevated-to-exponent (n e)
  "Compute the sum of the number N's digits to the exponent E."
  (->> n
    number-to-digits
    (--map (expt it e))
    (apply '+)))

(defun compute-numbers-which-sum-of-digits-elevated-to-exponent-is-itself (l e)
  "Filter L for which the sum of their digits to the exponent E is itself."
  (--filter (= (sum-of-digits-elevated-to-exponent it e) it) l))

(defun sum-of-numbers-which-sum-of-digits-elevated-to-exponent-is-itself (e)
  "Compute the sum of the digits to the exponent E."
  (let ((upper-limit (* e (expt 9 e))))
    (--> (number-sequence 2 upper-limit)
      (compute-numbers-which-sum-of-digits-elevated-to-exponent-is-itself it e)
      (apply '+ it))))

(require 'ert)
(require 'ert-expectations)
(require 'el-mock)

(expectations
 (desc "compute-numbers-which-sum-of-digits-elevated-to-exponent-is-itself")
 (expect '(1634 8208 9474)
         (compute-numbers-which-sum-of-digits-elevated-to-exponent-is-itself '(1634 8208 9474 1000) 4))
 (expect '(4150 4151 54748 92727 93084 194979)
         (compute-numbers-which-sum-of-digits-elevated-to-exponent-is-itself (number-sequence 2 295245) 5)))

(expectations
 (expect 19316
         (sum-of-numbers-which-sum-of-digits-elevated-to-exponent-is-itself 4))
 (expect 443839
         (sum-of-numbers-which-sum-of-digits-elevated-to-exponent-is-itself 5)))

(provide 'digit-fifth-powers)
;;; digit-fifth-powers ends here
