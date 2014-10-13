(require 'dash)

(defun number-to-digits (n)
  "Compute the number N into its digit as list."
  (mapcar (lambda (x) (- x ?0)) (number-to-string n)))

(defun sum-of-digits (n e)
  "Compute the sum of the number N's digits to the exponent E."
  (apply '+ (mapcar (lambda (x) (expt x e)) (number-to-digits n))))

(defun filter-digits (l e)
  "Filter the numbers for which the sum of their digit to the exponent E is itself."
  (--filter (= (sum-of-digits it e) it) l))

(filter-digits '(1634 8208 9474 1000) 4)
;; '(1634 8208 9474)

(filter-digits (number-sequence 2 295245) 5)
;; '(4150 4151 54748 92727 93084 194979)

(defun sum-of-digits-to-exponent (e)
  "Compute the sum of the digits to the exponents e"
  (let ((upper-limit (* e (expt 9 e))))
    (--> (number-sequence 2 upper-limit)
      (filter-digits it e)
      (apply '+ it))))

(sum-of-digits-to-exponent 4)
;; 19316 -> this is the same as the exercise

(sum-of-digits-to-exponent 5)
;; 443839 -> this is the result asked for

(filter-digits (number-sequence 2 (* 4 (expt 9 4))) 4)
(filter-digits (number-sequence 2 (* 5 (expt 9 5))) 5)
